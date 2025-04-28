FROM node:latest AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.28.0-alpine-slim

COPY --from=builder /app/build /usr/share/nginx/html
COPY ../nginx/default.conf ./etc/nginx/conf.d/default.conf
