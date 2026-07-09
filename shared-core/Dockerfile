FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY shared-core/package.json ./

RUN npm install

COPY shared-core .

ENV PRODUCTS_DB_PATH=/app/data/products.sqlite
ENV API_HOST=0.0.0.0
ENV API_PORT=4000

EXPOSE 4000

CMD ["npm", "run", "start:api"]
