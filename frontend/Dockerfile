# Use a Node.js version that is compatible with @eslint/js
FROM node:20.9.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the Vite development server
CMD ["yarn", "dev"]
