import { Assets, Sprite, Container } from 'pixi.js';

const createSunCloudAnimation = async (app) => {
  const sunCloudAssets = [
    'assets/weather/sunwithcloud.png',
    'assets/weather/cloud.png',
    'assets/weather/bigcloud.png',
  ];

  await Assets.load(sunCloudAssets);
  const [sunTexture, bigCloudTexture, smallCloudTexture] = sunCloudAssets.map(
    (asset) => Assets.get(asset)
  );

  const container = new Container();
  container.y = 10;
  app.stage.addChild(container);

  // Create the sun sprite
  const baseSunScale = 0.12;
  const sun = new Sprite(sunTexture);
  sun.anchor.set(0.5);
  sun.x = app.screen.width / 2 - 25;
  sun.y = app.screen.height / 3;
  sun.scale.set(baseSunScale);
  container.addChild(sun);

  // Create the big cloud
  const bigCloud = new Sprite(bigCloudTexture);
  bigCloud.anchor.set(0.5);
  bigCloud.x = app.screen.width / 1.7;
  bigCloud.y = app.screen.height / 2.3;
  bigCloud.scale.set(0.07);
  bigCloud.alpha = 0.95;
  container.addChild(bigCloud);

  // Create the small cloud
  const smallCloud = new Sprite(smallCloudTexture);
  smallCloud.anchor.set(0.5);
  smallCloud.x = app.screen.width / 2.8;
  smallCloud.y = app.screen.height / 1.7;
  smallCloud.scale.set(0.06);
  smallCloud.alpha = 0.95;
  container.addChild(smallCloud);

  // Sun pulsing effect
  let scaleDirection = 1;
  let sunScaleFactor = 1;
  const sunRotationSpeed = 0.0005;
  const sunPulseSpeed = 0.0006;
  const maxPulse = 1.05;
  const minPulse = 0.95;

  // Cloud movement variables
  let bigCloudDirection = 1;
  let smallCloudDirection = -1;
  const bigCloudSpeed = 0.07;
  const smallCloudSpeed = 0.1;

  //  Limit how far clouds can move horizontally
  const bigCloudMinX = bigCloud.x - 4;
  const bigCloudMaxX = bigCloud.x + 8;

  const smallCloudMinX = smallCloud.x - 9;
  const smallCloudMaxX = smallCloud.x + 6;

  // Animation loop
  app.ticker.add(() => {
    // Rotate the sun
    sun.rotation += sunRotationSpeed;

    // Make the sun pulse in size
    if (sunScaleFactor >= maxPulse) scaleDirection = -1;
    if (sunScaleFactor <= minPulse) scaleDirection = 1;
    sunScaleFactor += scaleDirection * sunPulseSpeed;
    sun.scale.set(baseSunScale * sunScaleFactor);

    // ☁️ Move the big cloud (limited left movement)
    bigCloud.x += bigCloudSpeed * bigCloudDirection;
    if (bigCloud.x >= bigCloudMaxX || bigCloud.x <= bigCloudMinX) {
      bigCloudDirection *= -1; // Change direction
    }

    // ☁️ Move the small cloud (limited right movement)
    smallCloud.x += smallCloudSpeed * smallCloudDirection;
    if (smallCloud.x >= smallCloudMaxX || smallCloud.x <= smallCloudMinX) {
      smallCloudDirection *= -1;
    }
  });
};

export default createSunCloudAnimation;
