FROM node:20-alpine

WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

RUN npm install

# Copy rest of backend code
COPY . .

# App port (change if different)
EXPOSE 5000

CMD ["npm", "start"]
