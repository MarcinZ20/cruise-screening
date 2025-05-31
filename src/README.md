# Cruise Screening App

We use **docker-copose** to orchestrate all of the services that are needed to run the application. These are:

1. Frontend

**React** application located in `src/frontend/`. It has two dockerfiles for development `Dockerfile.dev` and production `Dockerfile.prod`. For more information refer to the `src/frontend/README.md` file.

2. Backend (Search app)

Backend architecture of the application including search engine functionality. In the `src/docker-compose.yml` has a profile **search** attached. To include it in the build run:

```bash
sudo docker compose --profile dev --profile search up -d --build

```

3. Backend (cruise_literature)

This is the **django** application used as a main website service. For more information refer to the `src/cruise_literature/README.md` file.

4. Elastic Search

Elastic search service which has an **es** profile attached in the `src/docker-compose.yml` file. To inlcude it in the build run:

```bash
sudo docker compose --profile dev --profile es up -d --build

```

## Running the app

To run the application in development mode make sure you are in `src/` directory, then type

```bash
sudo docker compose --profile dev up -d --build

```

This command will build and run the development environemnt in the container with detached mode.

For deployment use the **prod** build profile like so:

```bash
sudo docker compose --profile prod up -d --build

```

This should build and run the production environment.


