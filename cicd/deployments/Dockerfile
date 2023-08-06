FROM node:14-slim

ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /app
COPY package.deps.json package.json
RUN yarn install
COPY . .
RUN yarn build
CMD ["yarn", "start"]
