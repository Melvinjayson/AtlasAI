from pydantic import BaseSettings
from typing import Optional

class AtlasConfig(BaseSettings):
    # Core LLM Settings
    DEFAULT_MODEL: str = "mixtral-8x7b"
    CONTEXT_WINDOW: int = 128000
    MODEL_TEMPERATURE: float = 0.7
    
    # Service Endpoints
    VECTOR_DB_URL: str = "localhost"
    VECTOR_DB_PORT: int = 19530  # Default Milvus port
    WORKFLOW_ENGINE_URL: str = "localhost:7233"  # Default Temporal port
    
    # Memory Settings
    MEMORY_DECAY_FACTOR: float = 0.95
    MAX_MEMORY_AGE_DAYS: int = 30
    MEMORY_COLLECTION_NAME: str = "atlas_memories"
    
    # API Settings
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_WORKERS: int = 4
    
    # Security Settings
    API_KEY: Optional[str] = None
    ENABLE_SSL: bool = False
    SSL_CERT_PATH: Optional[str] = None
    SSL_KEY_PATH: Optional[str] = None
    
    class Config:
        env_prefix = "ATLAS_"
        case_sensitive = False