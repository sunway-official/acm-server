# CEM-Server

Backend project for CEM

## Instruction

- Clone this project: `git clone https://github.com/sunway-team/cem-server.git`
- `cp .env.development .env`
- `npm i` to install dependencies
- `npm run migrate:rollback` or/and `npm run migrate:latest` to migrate the server
- `npm run dev` to start the server
- Open the browser and use `GRAPHIQL` to test the apis
- `npm run test` for `mocha` test
- `npm run lint` to run `eslint`

## Documents

- Start the server: `npm run dev`
- Run `npm run doc` to generate documents
- Open `doc/index.html` in the browser

## Deployment

- Open [Gcloud Console](https://console.cloud.google.com/home/dashboard?project=cem-server-production)
- Activate Google Cloud Shell
- `rm -rf cem-server && git clone https://github.com/sunway-team/cem-server && cd cem-server && git checkout production && cp .env.production .env && npm i && npm run build-all`
- `gcloud app deploy`
- Review and accept or change the services
- `gcloud app browse`
- Production app will be serve at [cem-server-production.appspot.com](cem-server-production.appspot.com)
