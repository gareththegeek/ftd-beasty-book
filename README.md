# Five Monsters Deep - OSR Monster Stats for Five Torches Deep

![Azure-Deploy](https://github.com/gareththegeek/ftd-beasty-book/workflows/Azure-Deploy/badge.svg)
![CI](https://github.com/gareththegeek/ftd-beasty-book/workflows/CI/badge.svg)

Search for monster stats to use in your games of FTD!

Reference monster stats for Five Torches Deep.

# Getting up and running

## Production

Install dependencies in all directories:
```bash
yarn
```

Build and publish `mongo-repo` if necessary:
```bash
cd mongo-repo
yarn build
yarn publish
cd ..
```

Build for production:
```bash
yarn build
```

Configure environment variables (see Environment Variables section).

Deploy contents of `api/dist` to server and execute:
```bash
node index.js
```

## Development

Install dependencies in all directories:
```bash
yarn
```

If using an existing mongo instance, configure `api/.env` with `MONGO_URL`. If not, run the following command to start a docker containerised local mongo instance:
```bash
yarn start:dev-db
```

Start API and UI
```bash
yarn start
```

API will run on `http://localhost:8080` and UI on `http://localhost:3000`.

## Importing Data

The import package is used to populate the mongo database from `.csv` files. Database configuration is achieved via environment variables (`.env` file in development environment).

- **categories.csv** - the strengths and weaknesses of the various categories of monster (such as Leader, Brute etc.)
- **hitdice.csv** - the damage associated with a given number of hit dice
- **monsters.csv** - the monsters description, techniques and statistics such as hit dice and speed

### Run Import

```bash
cd import
yarn start
```

# Environment Variables

The following environment variables must be defined in order to configure Five Monsters Deep.

|Variable|Purpose|Example|
|---|---|---|
|NODE_ENV|Configure environment for either `development` or `production`|production|
|PORT|Port used by node server (API and in production UI)|8080|
|ALLOWED_ORIGIN|Origin from which requests can be made for CORS configuration|http://localhost:3000|
|MONGO_URL|URL used to connect to the database using mongodb driver|mongodb://localhost|
|DATABASE_NAME|Name of the database to be used within the configured mongodb instance|ftd-beasty-book|
|MONSTER_COLLECTION_NAME|Collection within database used to store monster statistics|monsters|
|HITDICE_COLLECTION_NAME|Collection within database used to store hit dice damage|hitdice|
|CATEGORIES_COLLECTION_NAME|Collection within databse used to store categories|categories|
|REACT_APP_API_BASE_URL|Specifies the location of the API to be used by the UI to fetch data|http://localhost:8080/api|
|EXPECTED_HOST|Redirect requests to this hostname if specified|fivemonstersdeep.com|

# mongo-repo

This project includes a very basic repository implementation for mongodb (`ftd-beasty-book-mongo-repo`) as an `npm` package. This package is used both by the `api` and `import` packages to interract with the database.
