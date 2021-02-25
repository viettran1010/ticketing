FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install yarn
RUN yarn
COPY . .

CMD ["yarn", "dev"]
