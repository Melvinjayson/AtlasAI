.PHONY: install test lint format clean build run docker-build docker-run k8s-deploy

# Development Setup
install:
	poetry install

# Testing
test:
	poetry run pytest tests/ -v

# Linting and Formatting
lint:
	poetry run flake8 src/
	poetry run mypy src/

format:
	poetry run black src/ tests/
	poetry run isort src/ tests/

# Cleaning
clean:
	find . -type d -name "__pycache__" -exec rm -r {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type f -name ".coverage" -delete
	find . -type d -name ".pytest_cache" -exec rm -r {} +
	find . -type d -name ".mypy_cache" -exec rm -r {} +

# Building
build: clean
	poetry build

# Running
run:
	poetry run uvicorn atlas.services.query_handler:app --reload --host 0.0.0.0 --port 8000

# Docker Commands
docker-build:
	docker build -t atlas-ai .

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

# Kubernetes Commands
k8s-deploy:
	kubectl apply -f k8s/

k8s-delete:
	kubectl delete -f k8s/

# Development Database
db-setup:
	docker-compose up -d milvus temporal postgresql

db-clean:
	docker-compose down -v

# Monitoring
monitor:
	open http://localhost:3000 # Grafana
	open http://localhost:9090 # Prometheus

# API Documentation
docs:
	open http://localhost:8000/docs # Swagger UI
	@echo "ReDoc available at: http://localhost:8000/redoc"

# Help
help:
	@echo "Available commands:"
	@echo "  install      : Install project dependencies"
	@echo "  test         : Run tests"
	@echo "  lint         : Run linting checks"
	@echo "  format       : Format code"
	@echo "  clean        : Clean build artifacts"
	@echo "  build        : Build project"
	@echo "  run          : Run development server"
	@echo "  docker-build : Build Docker image"
	@echo "  docker-run   : Run with Docker Compose"
	@echo "  docker-stop  : Stop Docker Compose services"
	@echo "  k8s-deploy   : Deploy to Kubernetes"
	@echo "  k8s-delete   : Remove from Kubernetes"
	@echo "  db-setup     : Start development databases"
	@echo "  db-clean     : Clean development databases"
	@echo "  monitor      : Open monitoring dashboards"
	@echo "  docs         : Open API documentation"

# Default
.DEFAULT_GOAL := help