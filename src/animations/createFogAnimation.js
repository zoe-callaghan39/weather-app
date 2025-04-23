import { Assets, Sprite, Container } from 'pixi.js';

const createFogAnimation = async (app) => {
  const fogAssets = [
    'assets/weather/fog1.png',
    'assets/weather/fog2.png',
    'assets/weather/fog4.png',
    'assets/weather/fog5.png',
    'assets/weather/fog6.png',
  ];

  await Assets.load(fogAssets);
  const fogTextures = fogAssets.map((asset) => Assets.get(asset));

  // Create fog container
  const fogContainer = new Container();
  app.stage.addChild(fogContainer);

  const fogLayers = [];

  fogTextures.forEach((texture) => {
    const speed = 0.2 + Math.random() * 0.05;
    const yOffset = -15 + Math.random() * 30;
    const scale = 0.1 + Math.random() * 0.06;

    // Create two fog sprites for a continuous effect
    const fogSprite1 = new Sprite(texture);
    const fogSprite2 = new Sprite(texture);

    [fogSprite1, fogSprite2].forEach((sprite) => {
      sprite.anchor.set(0, 0.5);
      sprite.y = app.screen.height / 2 + yOffset;
      sprite.scale.set(scale);
      sprite.alpha = 0;
      fogContainer.addChild(sprite);
    });

    // Position sprites side by side
    fogSprite1.x = Math.random() * app.screen.width;
    fogSprite2.x = fogSprite1.x + fogSprite1.width - Math.random() * 20;

    fogLayers.push({
      sprites: [fogSprite1, fogSprite2],
      speed,
    });
  });

  // Fog animation loop
  app.ticker.add(() => {
    fogLayers.forEach(({ sprites, speed }) => {
      sprites.forEach((sprite, index) => {
        sprite.x -= speed;

        const fadeInStart = app.screen.width * 0.9;
        const fadeInEnd = app.screen.width * 0.6;
        const fadeOutStart = app.screen.width * 0.15;
        const fadeOutEnd = -sprite.width * 0.3;

        // Smooth fade-in effect
        if (sprite.x >= fadeInEnd) {
          sprite.alpha = Math.min(
            1,
            1 - (sprite.x - fadeInEnd) / (fadeInStart - fadeInEnd)
          );
        } else if (sprite.x <= fadeOutStart) {
          sprite.alpha = Math.max(0.3, sprite.x / fadeOutStart);
        } else {
          sprite.alpha = 1;
        }

        // Reset fog once it moves off-screen
        if (sprite.x + sprite.width < fadeOutEnd) {
          sprite.x =
            sprites[(index + 1) % 2].x + sprite.width - Math.random() * 30;
          sprite.alpha = 0;
        }
      });
    });
  });
};

export default createFogAnimation;
