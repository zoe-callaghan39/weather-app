import React, { useEffect, useRef } from 'react';
import { Application } from 'pixi.js';
import createSunAnimation from '../animations/createSunAnimation';
import createCloudAnimation from '../animations/createCloudAnimation';
import createRainAnimation from '../animations/createRainAnimation';
import createSnowAnimation from '../animations/createSnowAnimation';
import createWindAnimation from '../animations/createWindAnimation';
import createThunderAnimation from '../animations/createThunderAnimation';
import createFogAnimation from '../animations/createFogAnimation';
import createSunCloudAnimation from '../animations/createSunCloudAnimation';
import createMoonAndStarsAnimation from '../animations/createMoonAndStarsAnimation';

const WeatherAnimation = ({ weatherType, isNight }) => {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    // 1) Make sure our div is mounted
    if (!containerRef.current) return;

    // 2) Tear down any existing app
    if (appRef.current) {
      appRef.current.destroy(true);
      appRef.current = null;
    }

    // 3) Spin up a fresh Pixi Application
    const setup = async () => {
      const app = new Application(); // no options here
      await app.init({
        // fully initialize with options
        width: 200,
        height: 150,
        backgroundAlpha: 0,
      });

      // 4) Append its canvas element
      containerRef.current.appendChild(app.canvas);
      appRef.current = app;

      // 5) Kick off the right animation
      if (isNight) {
        createMoonAndStarsAnimation(app);
      } else {
        const map = {
          sun: createSunAnimation,
          cloudy: createCloudAnimation,
          sunwithcloud: createSunCloudAnimation,
          rain: createRainAnimation,
          snow: createSnowAnimation,
          wind: createWindAnimation,
          thunder: createThunderAnimation,
          fog: createFogAnimation,
        };
        map[weatherType]?.(app);
      }
    };

    setup();

    // 6) On cleanup (unmount or prop change), destroy the app
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true);
        appRef.current = null;
      }
    };
  }, [weatherType, isNight]);

  return <div ref={containerRef} className={isNight ? 'night-mode' : ''} />;
};

export default WeatherAnimation;
