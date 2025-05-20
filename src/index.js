/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/sw.js`, {
        scope: process.env.PUBLIC_URL + '/',
      })
      .then((reg) => {
        console.log('SW scope:', reg.scope);

        setInterval(() => {
          reg.update();
        }, 30_000);
      })
      .catch(console.error);
  });
}

window.addEventListener('offline', () => {
  window.location.href = `${process.env.PUBLIC_URL}/offline.html`;
});
window.addEventListener('online', () => {
  window.location.href = `${process.env.PUBLIC_URL}/`;
});
