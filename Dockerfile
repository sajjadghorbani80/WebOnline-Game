FROM node:16-alpine3.14
ENV NODE_ENV=production
WORKDIR /app
COPY ["./server/package.json", "./server/package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 80
CMD cd ./server; node app.js
