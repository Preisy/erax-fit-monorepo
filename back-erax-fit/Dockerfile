FROM node:latest

WORKDIR /var/ilonsi

ADD package.json package-lock.json /var/ilonsi/

RUN npm i

ADD .eslintrc.js nest-cli.json tsconfig.json ormconfig.ts tsconfig.build.json /var/ilonsi/
ADD .env /var/ilonsi/.env

CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]

EXPOSE 3000