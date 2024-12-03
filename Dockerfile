# Use a base image
FROM node:20.11.1

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose the application port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev", "--", "--host"]