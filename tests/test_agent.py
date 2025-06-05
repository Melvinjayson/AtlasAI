import pytest
from unittest.mock import Mock, patch
from atlas.core.agent import AtlasAgent, QueryContext, AtlasResponse
from atlas.core.config import AtlasConfig

@pytest.fixture
def config():
    return AtlasConfig(
        DEFAULT_MODEL="mixtral-8x7b",
        CONTEXT_WINDOW=128000,
        VECTOR_DB_URL="localhost",
        VECTOR_DB_PORT=19530
    )

@pytest.fixture
def mock_memory():
    return Mock()

@pytest.fixture
def mock_llm():
    return Mock()

@pytest.fixture
def mock_tokenizer():
    return Mock()

@pytest.fixture
async def agent(config, mock_memory, mock_llm, mock_tokenizer):
    with patch('atlas.core.agent.AtlasAgent._initialize_memory', return_value=mock_memory), \
         patch('atlas.core.agent.AtlasAgent._initialize_llm', return_value=mock_llm), \
         patch('atlas.core.agent.AtlasAgent._initialize_tokenizer', return_value=mock_tokenizer):
        agent = AtlasAgent(config)
        return agent

@pytest.mark.asyncio
async def test_process_query_basic(agent, mock_memory):
    # Arrange
    query = "What are the trends in asthma medication adherence?"
    context = QueryContext(
        persona="healthcare_analyst",
        domain="healthcare"
    )
    
    mock_memory.retrieve_relevant.return_value = [
        {
            "text": "Sample memory",
            "timestamp": "2024-01-01",
            "metadata": {}
        }
    ]
    
    # Act
    response = await agent.process_query(query, context)
    
    # Assert
    assert isinstance(response, AtlasResponse)
    assert mock_memory.retrieve_relevant.called
    assert mock_memory.store_memory.called

@pytest.mark.asyncio
async def test_process_query_with_error(agent, mock_memory):
    # Arrange
    query = "Invalid query"
    mock_memory.retrieve_relevant.side_effect = Exception("Database error")
    
    # Act & Assert
    with pytest.raises(Exception):
        await agent.process_query(query)

@pytest.mark.asyncio
async def test_process_query_empty(agent):
    # Arrange
    query = ""
    
    # Act & Assert
    with pytest.raises(ValueError):
        await agent.process_query(query)

@pytest.mark.asyncio
async def test_process_query_with_context(agent, mock_memory):
    # Arrange
    query = "Analyze patient data"
    context = QueryContext(
        persona="healthcare_analyst",
        domain="healthcare",
        metadata={"region": "UK", "year": 2024}
    )
    
    mock_memory.retrieve_relevant.return_value = []
    
    # Act
    response = await agent.process_query(query, context)
    
    # Assert
    assert isinstance(response, AtlasResponse)
    assert mock_memory.retrieve_relevant.called
    
    # Verify context was used
    call_args = mock_memory.store_memory.call_args
    assert call_args is not None
    stored_metadata = call_args[1].get('metadata', {})
    assert 'context' in stored_metadata
    assert stored_metadata['context'].get('domain') == 'healthcare'