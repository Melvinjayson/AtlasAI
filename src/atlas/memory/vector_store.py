from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from pymilvus import (
    Collection,
    connections,
    FieldSchema,
    CollectionSchema,
    DataType,
    utility
)
from ..core.config import AtlasConfig
from loguru import logger

class AtlasMemory:
    def __init__(self, config: AtlasConfig):
        self.config = config
        self._initialize_connection()
        self._ensure_collection_exists()
    
    def _initialize_connection(self) -> None:
        try:
            connections.connect(
                host=self.config.VECTOR_DB_URL,
                port=self.config.VECTOR_DB_PORT
            )
            logger.info("Connected to Milvus successfully")
        except Exception as e:
            logger.error(f"Failed to connect to Milvus: {str(e)}")
            raise
    
    def _ensure_collection_exists(self) -> None:
        try:
            if not utility.has_collection(self.config.MEMORY_COLLECTION_NAME):
                self._create_collection()
            logger.info(f"Collection {self.config.MEMORY_COLLECTION_NAME} is ready")
        except Exception as e:
            logger.error(f"Failed to ensure collection exists: {str(e)}")
            raise
    
    def _create_collection(self) -> None:
        fields = [
            FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
            FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=65535),
            FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=1536),  # Matches Mixtral embedding dim
            FieldSchema(name="timestamp", dtype=DataType.INT64),
            FieldSchema(name="metadata", dtype=DataType.JSON)
        ]
        schema = CollectionSchema(fields=fields, description="Atlas memory storage")
        collection = Collection(
            name=self.config.MEMORY_COLLECTION_NAME,
            schema=schema,
            using='default'
        )
        
        # Create index for vector similarity search
        index_params = {
            "metric_type": "L2",
            "index_type": "IVF_FLAT",
            "params": {"nlist": 1024}
        }
        collection.create_index(
            field_name="embedding",
            index_params=index_params
        )
        logger.info("Created new collection with index")
    
    async def store_memory(
        self,
        text: str,
        metadata: Dict[str, Any],
        collection_name: Optional[str] = None
    ) -> None:
        try:
            collection_name = collection_name or self.config.MEMORY_COLLECTION_NAME
            collection = Collection(collection_name)
            collection.load()
            
            # Generate embedding for the text
            embedding = self._generate_embedding(text)
            
            # Prepare data for insertion
            data = [
                [text],
                [embedding],
                [int(datetime.now().timestamp())],
                [metadata]
            ]
            
            collection.insert(data)
            logger.info(f"Stored new memory in collection {collection_name}")
        except Exception as e:
            logger.error(f"Failed to store memory: {str(e)}")
            raise
        finally:
            collection.release()
    
    async def retrieve_relevant(
        self,
        query: str,
        k: int = 5,
        collection_name: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        try:
            collection_name = collection_name or self.config.MEMORY_COLLECTION_NAME
            collection = Collection(collection_name)
            collection.load()
            
            # Generate query embedding
            query_embedding = self._generate_embedding(query)
            
            # Search for similar vectors
            search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
            results = collection.search(
                data=[query_embedding],
                anns_field="embedding",
                param=search_params,
                limit=k,
                output_fields=["text", "timestamp", "metadata"]
            )
            
            # Process results
            memories = []
            for hits in results:
                for hit in hits:
                    memory = {
                        "text": hit.entity.get("text"),
                        "timestamp": datetime.fromtimestamp(hit.entity.get("timestamp")),
                        "metadata": hit.entity.get("metadata"),
                        "similarity": hit.distance
                    }
                    memories.append(memory)
            
            logger.info(f"Retrieved {len(memories)} relevant memories")
            return memories
        except Exception as e:
            logger.error(f"Failed to retrieve memories: {str(e)}")
            raise
        finally:
            collection.release()
    
    def _generate_embedding(self, text: str) -> List[float]:
        # TODO: Implement actual embedding generation using the LLM
        # For now, return a dummy embedding
        return [0.0] * 1536  # Placeholder 1536-dimensional vector
    
    async def cleanup_old_memories(self, max_age_days: Optional[int] = None) -> None:
        try:
            max_age = max_age_days or self.config.MAX_MEMORY_AGE_DAYS
            cutoff_timestamp = int((datetime.now() - timedelta(days=max_age)).timestamp())
            
            collection = Collection(self.config.MEMORY_COLLECTION_NAME)
            expr = f'timestamp < {cutoff_timestamp}'
            collection.delete(expr)
            
            logger.info(f"Cleaned up memories older than {max_age} days")
        except Exception as e:
            logger.error(f"Failed to cleanup old memories: {str(e)}")
            raise