# Home Library Service

## Prerequisites

- Install Docker and Docker Compose (https://www.docker.com/products/docker-desktop/)
- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js (optional, only if you want to run the app without Docker or run tests) - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
cd {repository folder}
```

Environment variables

## ENV variables

Create .env file with all necessary env variables (see .env.example).

## Running application with Docker

- Build and start application and database:

```
docker compose up --build -d
```

- Run database migrations inside the server container:

```
docker compose exec server npm run migration:run
```

- After that the Swagger doc will be available at http://localhost:4000/doc.

- To stop containers:

```
docker compose down
```

## Testing

- Make sure containers are running and deps are installed:

```
npm install
docker compose up --build -d
docker compose exec server npm run migration:run
```

- Run all tests (in separate terminal)

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
