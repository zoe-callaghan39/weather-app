/* eslint-disable no-undef */
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// register the SW under the "/weather-app" sub-path
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(
        // PUBLIC_URL becomes "/weather-app" in production on GH-Pages
        `${process.env.PUBLIC_URL}/sw.js`,
        { scope: process.env.PUBLIC_URL + '/' }
      )
      .then((registration) => {
        console.log(
          'Service Worker registered with scope:',
          registration.scope
        );
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

// immediately redirect in-app on connectivity changes
window.addEventListener('offline', () => {
  // send to "/weather-app/offline.html"
  window.location.href = `${process.env.PUBLIC_URL}/offline.html`;
});
window.addEventListener('online', () => {
  // send back home
  window.location.href = `${process.env.PUBLIC_URL}/`;
});
