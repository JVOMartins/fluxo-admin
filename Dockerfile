FROM node:lts

ENV PORT 3000

RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web
COPY package*.json /usr/src/web/

RUN npm install
COPY . /usr/src/web
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]