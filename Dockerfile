# Use official Node.js image
FROM arm64v8/node:22-alpine

# Set environment variables
ARG WORKDIR
ARG NODE_ENV
ARG INTERNAL_PORT
ARG APP_ENV

# Set working directory
WORKDIR $WORKDIR

# Copy package files first for better caching
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci --include=dev

# Copy all files
COPY . .

# Replace environment variables in config.js
RUN echo "$APP_ENV" > .env

# Build the app
RUN npm run build

# Expose the app port
EXPOSE $INTERNAL_PORT

# Run the app
CMD ["npm", "start"]