# Use Node.js as the base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY . .
RUN npm install --frozen-lockfile

RUN npx prisma generate
# RUN npx prisma migrate deploy
# RUN npm run build

# Expose the backend port
EXPOSE 5000

# Run migrations before starting the backend
# RUN npx prisma migrate dev
CMD ["npm","run","dev"]
