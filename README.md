# e-radio-rest

A REST API service to get e-radio stations data from e-radio.gr portal.

## Contents

-   [Requirements](#requirements)
-   [Installation](#installation)
-   [Testing](#testing)
-   [Quickstart](#quickstart)
-   [API](#api)
-   [Docker](#docker)
    -   [Run docker container](#run-docker-container)
-   [License](#license)

## Requirements

Node.js **v14** or higher

## Installation

```js
npm install
```

## Testing

```js
npm test
```

## Quickstart

```js
npm start
```

## API

The service API can be inspected through Swagger UI, which is available here **[localhost:8080/api-doc]**

## Docker

The application is dockerized and can be run by starting a docker container.

#### Run docker container

```sh
docker run -d --name eradio -p 8080:8080 denlap/eradio
```

##### Container Environment variables

Can be passed to the container at runtime through **-e flag**:

-   host
-   port
-   logLevel

_Example_

```sh
docker run -d --name eradio -p 8080:8080 -e "logLevel=info" denlap/eradio
```

## License

Licensed under [GPL v3.0]

[gpl v3.0]: https://hapi.dev/
[localhost:3000/api-doc]: http://localhost:3000/api-doc
