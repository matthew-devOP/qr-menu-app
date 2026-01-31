FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* .npmrc* ./

RUN apt-get update && apt-get install -y openssl

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy source
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
