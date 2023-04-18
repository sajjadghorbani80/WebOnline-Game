FROM --platform=linux/amd64 node:16.20.0-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ./server/package.json ./server/
COPY ./server/package-lock.json* ./server/
RUN npm install --prefix ./server/
COPY . .
EXPOSE 80
CMD cd ./server; node app.js