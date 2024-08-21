# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Set environment variables (Optional: These can also be set in docker-compose.yml)
ENV NODE_ENV=development

# Expose the port that the backend service will run on
EXPOSE 5000

# Command to run the backend service
CMD ["yarn", "dev"]
