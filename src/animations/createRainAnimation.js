import { Assets, Sprite, Container } from 'pixi.js';

const createRainAnimation = async (app) => {
  const rainAssets = [
    'assets/weather/raincloud.png',
    'assets/weather/raindrop.png',
  ];

  await Assets.load(rainAssets);
  const [cloudTexture, rainTexture] = rainAssets.map((asset) =>
    Assets.get(asset)
  );

  // Create and position the rain cloud
  const cloud = new Sprite(cloudTexture);
  cloud.anchor.set(0.5);
  cloud.x = app.screen.width / 2;
  cloud.y = app.screen.height / 4;
  cloud.scale.set(0.07);
  app.stage.addChild(cloud);

  const cloudHeight = cloud.height;

  // Create a container for raindrops
  const rainContainer = new Container();
  app.stage.addChild(rainContainer);

  const numRaindrops = 100;
  const raindrops = [];

  // Define rainfall area width
  const fullCloudWidth = cloud.width;
  const rainWidthFactor = 0.85;
  const rainWidth = fullCloudWidth * rainWidthFactor;
  const leftEdge = cloud.x - rainWidth / 2;
  const cloudBottomY = cloud.y + cloudHeight / 2;

  const randomRainX = () => leftEdge + Math.random() * rainWidth;

  for (let i = 0; i < numRaindrops; i++) {
    const raindrop = new Sprite(rainTexture);
    raindrop.anchor.set(0.5);

    raindrop.x = randomRainX();
    raindrop.y =
      cloudBottomY + Math.random() * (app.screen.height - cloudBottomY);

    // Vary rain drop sizes
    const dropSize = 0.0025 + Math.random() * 0.002;
    raindrop.scale.set(dropSize);

    // Adjust transparency of raindrops
    raindrop.alpha = Math.random() * 0.4 + 0.4;
    rainContainer.addChild(raindrop);

    raindrops.push({
      sprite: raindrop,
      speed: Math.random() * 0.5 + 1,
    });
  }

  // Animation loop
  app.ticker.add(() => {
    raindrops.forEach((drop) => {
      drop.sprite.y += drop.speed;
      drop.sprite.alpha -= 0.002;

      // Reset raindrop position when it reaches the bottom
      if (drop.sprite.y > app.screen.height) {
        drop.sprite.y = cloudBottomY + Math.random() * 10;
        drop.sprite.x = randomRainX();
        drop.sprite.alpha = Math.random() * 0.4 + 0.4;
      }
    });
  });
};

export default createRainAnimation;
