# Weatherly Weather App 🌤️

Weatherly is a lightweight React application that delivers current weather conditions and local time for any city around the globe. It stores your favourite places in localStorage so they are waiting for you each time you open the app, and it ships with a service‑worker‑driven offline page that informs you when you lose connectivity. Each city is presented as a compact card that includes a PixiJS animation that matches the reported weather.

## Live site

The app is deployed on GitHub Pages and can be viewed at: https://zoe-callaghan39.github.io/weather-app

## Technology snapshot

The interface is built with React 18 and Vite; meteorological data is provided by Open‑Meteo, local time by TimeAPI.io, and visual effects are rendered with PixiJS on an HTML5 canvas. State is managed with React hooks, favourites are persisted in localStorage, and offline capability is achieved with a Workbox‑generated service worker. Continuous deployment to GitHub Pages is automated through the gh‑pages npm package.

## Getting started
- Clone the repository and run `npm install`. During development, run `npm start` to launch the local server at http://localhost:3000.
- Run `npm test` to run tests and launch the test runner in interactive watch mode.
- To publish changes, `npm run deploy` builds the production bundle and pushes it to the gh‑pages branch; repeat this command any time you commit up


