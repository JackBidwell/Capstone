# Use the official Node.js image.
FROM node:18

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the React app.
RUN npm run build

# Install serve globally.
RUN npm install -g serve

# Set environment variable to specify the port.
ENV PORT 8080

# Expose the port the app runs on.
EXPOSE 8080

# Serve the build directory.
CMD ["serve", "-s", "dist"]
