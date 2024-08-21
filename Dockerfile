FROM node:18-alpine3.17 AS build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM node:18-alpine3.17

WORKDIR /app
COPY --from=build /app/dist /app

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
