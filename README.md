# CEM-Server

Backend project for CEM

## Development Status

* Working on messages API

## Instruction

* Clone this project: `git clone https://github.com/sunway-team/cem-server.git`
* `cp .env.development .env`
* `npm i` to install dependencies
* `npm run migrate:rollback` or/and `npm run migrate:latest` to migrate the
  server
* `npm run dev` to start the server
* Open the browser and use `GRAPHIQL` to test the apis
* `npm run test` for `mocha` test
* `npm run lint` to run `eslint`

## Documents

* Start the server: `npm run dev`
* Run `npm run doc` to generate documents
* Open `doc/index.html` in the browser

## Deployment

* Clone the project: `git clone https://github.com/sunway-team/cem-server`
* Go to the project folder: `cd cem-server`
* Checkout production branch `git checkout production` (Postponed for now,
  please stay on master instead if it's newer)
* Install dependencies: `npm i`
* Create the production .env file: `cp .env.production .env`
* Build project: `npm run build`
* Run `reset:db:staged` to reset production database and reseed data, if there
  is any errors then restart the database, remove the `cem` database, recreate
  `cem` and run the command again
* Open
  [Bucket](https://console.cloud.google.com/storage/browser/acm-server?project=cem-server-production)
* Remove all files inside it and upload: `app.yaml`, `package.json` and `build`
  folder to the bucket
* Open `Gcloud Console` (top right corner of the screen)
* `rm -rf acm-server && mkdir acm-server && gsutil rsync -r gs://acm-server
  ./acm-server && cd acm-server && gcloud app deploy -q`
* `gcloud app browse`
* Production app will be serve at
  [cem-server-production.appspot.com](http://cem-server-production.appspot.com)
