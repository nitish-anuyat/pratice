FROM node:16.14.0 as build
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN npm run build:ssr
CMD ["node", "dist/server/main.js"]
