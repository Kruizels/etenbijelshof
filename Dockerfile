# Dockerfile
FROM node:22-alpine

# Zet werkdir
WORKDIR /usr/src/app

# Kopieer alleen package-bestanden en installeer dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Kopieer de rest van de code
COPY . .

# Open port 3000
EXPOSE 3000

# Start de Dev-server
CMD ["npm", "run", "dev"]
