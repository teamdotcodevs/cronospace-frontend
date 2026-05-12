# =========================
# Builder Stage
# =========================
FROM python:3.12-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip

RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# =========================
# Final Stage
# =========================
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Create non-root user for security
RUN addgroup --system app && adduser --system --ingroup app app

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY . .

# Create necessary directories with proper permissions
RUN mkdir -p /app/staticfiles /app/data && \
    chown -R app:app /app

# Ensure entrypoint is executable
RUN chmod +x docker/entrypoint.sh

# Switch to non-root user
USER app

EXPOSE 8000

ENTRYPOINT ["sh", "docker/entrypoint.sh"]
