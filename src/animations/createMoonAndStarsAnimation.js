import { Container, Sprite, Assets } from 'pixi.js';

const createMoonAndStarsAnimation = async (app) => {
  const moonAndStarsAssets = [
    '/assets/weather/moon1.png',
    'https://pixijs.com/assets/star.png',
  ];

  await Assets.load(moonAndStarsAssets);
  const [moonTexture, starTexture] = moonAndStarsAssets.map((asset) =>
    Assets.get(asset)
  );

  // Create a container for stars
  const starsContainer = new Container();
  app.stage.addChild(starsContainer);

  // Star animation setup
  const starAmount = 1000;
  let cameraZ = 0;
  const fov = 20;
  const baseSpeed = 0.02;
  const stars = [];

  for (let i = 0; i < starAmount; i++) {
    const star = {
      sprite: new Sprite(starTexture),
      z: Math.random() * 600,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 60,
    };

    star.sprite.anchor.set(0.5);

    // Randomise star sizes
    const sizeFactor = Math.random() * 0.8 + 0.1;
    star.sprite.scale.set(sizeFactor * 0.05);

    starsContainer.addChild(star.sprite);
    stars.push(star);
  }

  // Star animation loop
  app.ticker.add((time) => {
    cameraZ += time.deltaTime * 13 * baseSpeed;

    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      const z = star.z - cameraZ;

      star.sprite.x =
        star.x * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.width / 2;
      star.sprite.y =
        star.y * (fov / z) * app.renderer.screen.width +
        app.renderer.screen.height / 2;

      star.sprite.y += Math.sin(time.elapsedMS * 0.008) * 3;

      // Reset stars when they move too far
      if (star.z < cameraZ - 50) {
        star.z += 600;
        star.x = (Math.random() - 0.5) * 60;
        star.y = (Math.random() - 0.5) * 60;
      }
    }
  });

  // Create and position the moon
  const moon = new Sprite(moonTexture);
  moon.anchor.set(0.5);
  moon.x = app.screen.width / 2;
  moon.y = app.screen.height / 4;
  // moon.scale.set(0.025);
  moon.scale.set(0.05);
  app.stage.addChild(moon);

  // Add rotation animation to the moon
  app.ticker.add((time) => {
    // Increase the moon's rotation over time.
    // Adjust the multiplier (0.005) to control rotation speed.
    moon.rotation += 0.0007 * time.deltaTime;
  });
};

export default createMoonAndStarsAnimation;
