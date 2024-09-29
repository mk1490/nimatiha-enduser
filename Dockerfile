FROM node:lts-alpine
#RUN yarn config set registry https://npm.iranrepo.ir/
RUN yarn global add http-server --verbose
WORKDIR /frontend
COPY package*.json ./
RUN yarn --verbose
COPY . .
RUN ["yarn", "build"]
EXPOSE 8080
CMD [ "http-server", "dist"]