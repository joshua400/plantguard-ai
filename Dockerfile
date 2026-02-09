# Build Stage for Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final Stage for Backend
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code and model
COPY api/ ./api
COPY model_training/ ./model_training
COPY plant-disease-model.pth ./plant-disease-model.pth

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/dist ./static

# Expose port
EXPOSE 8080

# Run FastAPI
CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8080"]
