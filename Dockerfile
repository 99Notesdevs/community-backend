# Use official Node.js LTS image
FROM node:current-alpine3.22

# Set working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --include=dev

# Copy the entire app
COPY . .

# Generate Prisma Client Prior
RUN npx prisma generate

# Expose server port
EXPOSE 5555

# Start the server
CMD ["npm", "run", "dev"]
