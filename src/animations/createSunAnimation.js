import { Container, Sprite, Assets } from 'pixi.js';

const createSunAnimation = async (app) => {
  const sunAsset = 'assets/weather/fullsun.png';

  await Assets.load(sunAsset);
  const texture = Assets.get(sunAsset);

  const sunContainer = new Container();
  app.stage.addChild(sunContainer);

  // Create the sun sprite
  const sun = new Sprite(texture);
  sun.anchor.set(0.5);
  sun.x = app.screen.width / 2;
  sun.y = app.screen.height / 2;
  sun.scale.set(1.05);

  sunContainer.addChild(sun);

  // Sun pulsing effect variables
  let scaleDirection = 1;
  let sunScale = 1;
  const sunRotationSpeed = 0.0009;
  const sunPulseSpeed = 0.0009;
  const maxPulse = 1;
  const minPulse = 0.94;

  // Animation loop
  app.ticker.add(() => {
    sun.rotation += sunRotationSpeed;

    // Pulsing effect
    if (sunScale >= maxPulse) scaleDirection = -1;
    if (sunScale <= minPulse) scaleDirection = 1;
    sunScale += scaleDirection * sunPulseSpeed;

    sun.scale.set(0.12 * sunScale);
  });
};

export default createSunAnimation;
