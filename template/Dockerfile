FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY shared-core/package.json /shared-core/package.json
COPY SITE_NAME/package.json ./

RUN npm install file:/shared-core && npm install

COPY shared-core /shared-core
COPY SITE_NAME .

ENV SHARED_CORE_PATH=/shared-core
ENV NEXT_PUBLIC_SITE_ID=SITE_NAME

EXPOSE SITE_PORT

CMD ["npm", "run", "start"]
