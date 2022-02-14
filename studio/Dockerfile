FROM node:14

RUN mkdir /app
ADD . /app

WORKDIR /app
RUN yarn

EXPOSE 3333

CMD ["yarn", "sanity", "start", "--host=0.0.0.0"]
