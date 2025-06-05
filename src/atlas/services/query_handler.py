from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security.api_key import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
from fastapi_prometheus import PrometheusFastApiInstrumentator
from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

from ..core.agent import AtlasAgent, QueryContext, AtlasResponse
from ..core.config import AtlasConfig
from loguru import logger

app = FastAPI(
    title="Atlas AI API",
    description="Native AI Agent System for Insight Generation & Adaptive Intelligence",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Prometheus monitoring
PrometheusFastApiInstrumentator.instrument(app)

# Initialize API key security
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

class QueryRequest(BaseModel):
    text: str
    persona: Optional[str] = None
    domain: Optional[str] = None
    metadata: Dict[str, Any] = {}

class ErrorResponse(BaseModel):
    error: str
    timestamp: datetime
    request_id: str

# Dependency for API key validation
async def verify_api_key(api_key: str = Security(api_key_header)):
    config = AtlasConfig()
    if config.API_KEY and (not api_key or api_key != config.API_KEY):
        raise HTTPException(
            status_code=403,
            detail="Invalid API key"
        )
    return api_key

# Initialize Atlas agent
@app.on_event("startup")
async def startup_event():
    try:
        app.state.config = AtlasConfig()
        app.state.agent = AtlasAgent(app.state.config)
        logger.info("Atlas API initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize Atlas API: {str(e)}")
        raise

@app.post("/query", response_model=AtlasResponse, dependencies=[Depends(verify_api_key)])
async def handle_query(request: QueryRequest):
    try:
        context = QueryContext(
            persona=request.persona,
            domain=request.domain,
            metadata=request.metadata
        )
        
        response = await app.state.agent.process_query(
            query=request.text,
            context=context
        )
        
        return response
    except Exception as e:
        logger.error(f"Error processing query: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/metrics")
async def get_metrics(api_key: str = Security(api_key_header)):
    # Custom metrics endpoint - implement as needed
    pass

if __name__ == "__main__":
    import uvicorn
    config = AtlasConfig()
    uvicorn.run(
        "atlas.services.query_handler:app",
        host=config.API_HOST,
        port=config.API_PORT,
        workers=config.API_WORKERS,
        reload=True
    )