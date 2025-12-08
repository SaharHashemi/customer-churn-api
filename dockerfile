FROM python:3.11-slim

WORKDIR /app

# Install system dependencies needed for building packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip, setuptools, and wheel first
RUN pip install --upgrade pip setuptools wheel

# Copy requirements first for better caching
COPY requirements.txt .

# Install numpy first (required for pandas)
RUN pip install --no-cache-dir numpy==1.24.3

# Install rest of Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directories for static files and templates
RUN mkdir -p static templates

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
