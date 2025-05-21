# Step 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the full source and build it
COPY . .
RUN npm run build

# Step 2: Run the app with a lightweight server
FROM node:20-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

WORKDIR /app

# Copy only the built output and necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port 3000 (default Next.js port)
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
