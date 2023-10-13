FROM node:latest

WORKDIR /var/erax

ADD package.json package-lock.json /var/erax/

RUN npm i

ADD .eslintrc.js nest-cli.json tsconfig.json ormconfig.ts tsconfig.build.json /var/erax/
ADD .env /var/erax/.env

CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]

EXPOSE 3000