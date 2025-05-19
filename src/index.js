import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Register the custom service worker located at public/service-worker.js
    navigator.serviceWorker
      .register(
        `${window.location.origin}${window.location.pathname}service-worker.js`
      )
      .then(() => {
        console.log('Service Worker registered successfully');
      })
      .catch((err) => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
