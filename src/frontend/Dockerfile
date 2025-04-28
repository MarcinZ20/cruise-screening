FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./ 

RUN npm ci 

COPY . . 
RUN npm run build

FROM nginx:1.28.0-alpine-slim

COPY --from=builder /app/build /usr/share/nginx/html
