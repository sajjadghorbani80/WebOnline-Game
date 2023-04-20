FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ./server/package.json ./server/
COPY ./server/package-lock.json* ./server/
RUN npm install --prefix ./server/
COPY . .
RUN npx prisma generate --schema=./server/prisma/schema.prisma
EXPOSE 3000
CMD cd ./server; node app.js