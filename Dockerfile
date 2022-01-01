FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /src
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3079
RUN chown -R node /src
USER node
CMD ["npm", "start",]
