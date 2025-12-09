FROM python:3.11-slim

# Force Python 3.11 explicitly
ENV PYTHON_VERSION=3.11
ENV PYTHONUNBUFFERED=1
ENV PORT=5000

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Verify we're using Python 3.11
RUN python3.11 --version && python3.11 -m pip --version

# Use python3.11 explicitly for all pip commands
RUN python3.11 -m pip install --upgrade pip==24.0

# Install setuptools with explicit Python 3.11
RUN python3.11 -m pip install --no-cache-dir "setuptools==69.0.0" "wheel==0.42.0"

# Verify setuptools
RUN python3.11 -c "import setuptools; print('setuptools OK:', setuptools.__version__)"

# Copy requirements
COPY requirements.txt .

# Install numpy first
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation numpy==1.24.3

# Install pandas
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation pandas==2.0.3

# Install packages one by one to avoid conflicts
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation fastapi==0.104.1
   RUN python3.11 -m pip install --no-cache-dir --no-build-isolation "uvicorn[standard]==0.24.0"
   # Install scipy first (required for scikit-learn)
   RUN python3.11 -m pip install --no-cache-dir --no-build-isolation scipy
   # Install scikit-learn (let pip choose compatible version)
   RUN python3.11 -m pip install --no-cache-dir --no-build-isolation scikit-learn
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation xgboost==2.0.3
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation python-multipart==0.0.6
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation jinja2==3.1.2
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation aiofiles==23.2.1

# Copy application
COPY . .

# Create directories if they don't exist
RUN mkdir -p static templates || true

# Verify important files exist
RUN echo "=== Files in /app ===" && ls -la /app/ | head -20 && \
    echo "=== Checking static ===" && (ls -la /app/static/ 2>/dev/null || echo "static directory empty or missing") && \
    echo "=== Checking templates ===" && (ls -la /app/templates/ 2>/dev/null || echo "templates directory empty or missing")

# Expose port
EXPOSE 5000

# Use python3.11 to run
CMD ["python3.11", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5000"]



