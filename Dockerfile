FROM node:16-alpine as builder
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL $REACT_APP_API_BASE_URL

WORKDIR /app

WORKDIR /app/ui
COPY ./ui/package.json ./
COPY ./ui/yarn.lock ./
RUN yarn install
COPY ./ui ./
RUN yarn build

WORKDIR /app/api
COPY ./api/package.json ./
COPY ./api/yarn.lock ./
RUN yarn
COPY ./api ./
RUN yarn build

FROM node:16-alpine

ENV NODE_ENV production
ENV PORT 8080
ENV ALLOWED_ORIGIN ""
ENV MONGO_URL ""
ENV DATABASE_NAME "ftd-beasty-book"
ENV MONSTER_COLLECTION_NAME "monsters"
ENV HITDICE_COLLECTION_NAME "hitdice"
ENV CATEGORIES_COLLECTION_NAME "categories"
ENV EXPECTED_HOST "fivemonstersdeep.com"

WORKDIR /app
COPY --from=builder /app/api/dist /app
COPY --from=builder /app/api/src/data /app/data
COPY ./api/package.json /app
COPY ./api/yarn.lock /app
RUN yarn install --production=true

EXPOSE $PORT
USER node
CMD ["node", "index.js"]