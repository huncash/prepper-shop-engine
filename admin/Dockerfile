FROM node:22-alpine

WORKDIR /app

COPY shared-core/package.json /shared-core/package.json
COPY admin/package.json ./

RUN npm install file:/shared-core && npm install

COPY shared-core /shared-core
COPY admin .

ENV ADMIN_HOST=127.0.0.1
ENV ADMIN_PORT=4002
ENV PRIVATE_DATA_PATH=/root/private_data/source_data.json

EXPOSE 4002

CMD ["npx", "tsx", "src/server.ts"]
