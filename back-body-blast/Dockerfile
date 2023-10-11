FROM node:latest

WORKDIR /var/ilonsi

ADD package.json yarn.lock /var/ilonsi/
ADD back-body-blast/package.json back-body-blast/yarn.lock /var/ilonsi/

RUN yarn install

ADD .eslintrc.json tsconfig.json /var/ilonsi/
ADD back-body-blast/.eslintrc.js back-body-blast/nest-cli.json back-body-blast/tsconfig.json back-body-blast/ormconfig.ts back-body-blast/tsconfig.build.json /var/ilonsi/
ADD .env /var/ilonsi/.env

CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]

EXPOSE 3000