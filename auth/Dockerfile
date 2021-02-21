FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install yarn
RUN yarn install
COPY . .

CMD ["yarn", "start"]
