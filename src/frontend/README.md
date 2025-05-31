# Cruise Screening - Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Frontend application uses 
- **react.js** as a main frontend framework
- **tailwind.css** for styling components.
- **nginx** to serve the application

Tailwind configuration can be found in `src/frontend/tailwind.config`.

Nginx configuration can be found in `src/frontend/nginx/conf`.

### Running the app

We recommend using **Docker** to run the application. There are 2 ways to do so:

#### Development run

- Use this while writing code.
- Supports hot-reloading, which helps when making changes to the codebase. 
- Serves the application frontend on port `:3000`

It's build with the use of `Dockerfile.dev`.

To run the whole application in the development mode, go back to the `src/` directory and run:
```bash
sudo docker compose --profile dev up -d --build

```
The frontend should be aviable on `http://localhost:3000`

#### Production run

- Use this when you want to deploy the application.
- Uses multistage build to optimize the container size.
- Serves application frontend on port `:3000`

It's build with the use of `Dockerfile.prod`.

To run the whole application in the development mode, go back to the `src/` directory and run:

```bash
sudo docker compose --profile prod up -d --build

```

The frontend should be aviable on `http://localhost:3000`

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

