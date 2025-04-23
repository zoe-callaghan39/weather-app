import { Assets, Sprite, Container } from 'pixi.js';

const createSnowAnimation = async (app) => {
  const snowAssets = [
    'assets/weather/snowcloud.png',
    'assets/weather/snowflake.png',
  ];

  await Assets.load(snowAssets);
  const [cloudTexture, snowTexture] = snowAssets.map((asset) =>
    Assets.get(asset)
  );

  // Create and position the cloud
  const cloud = new Sprite(cloudTexture);
  cloud.anchor.set(0.5);
  cloud.x = app.screen.width / 2;
  cloud.y = app.screen.height / 4.2;
  cloud.scale.set(0.07);
  app.stage.addChild(cloud);

  const cloudHeight = cloud.height;

  // Create a container for falling snowflakes
  const snowContainer = new Container();
  app.stage.addChild(snowContainer);

  const numSnowflakes = 60;
  const snowflakes = [];

  for (let i = 0; i < numSnowflakes; i++) {
    const snowflake = new Sprite(snowTexture);
    snowflake.anchor.set(0.5);

    snowflake.x = cloud.x - 40 + Math.random() * 80;
    snowflake.y = cloud.y + cloudHeight / 4 + Math.random() * 20;

    // Varying snowflake sizes
    const sizeChance = Math.random();
    if (sizeChance < 0.15) {
      snowflake.scale.set(0.002 + Math.random() * 0.002);
    } else if (sizeChance < 0.45) {
      snowflake.scale.set(0.004 + Math.random() * 0.003);
    } else if (sizeChance < 0.8) {
      snowflake.scale.set(0.007 + Math.random() * 0.005);
    } else {
      snowflake.scale.set(0.01 + Math.random() * 0.006);
    }

    snowflake.alpha = Math.random() * 0.4 + 0.6;
    snowContainer.addChild(snowflake);

    snowflakes.push({
      sprite: snowflake,
      speed: Math.random() * 1.2 + 0.4,
      drift: Math.random() * 0.5 - 0.25,
      rotationSpeed: Math.random() * 0.01 - 0.005,
    });
  }

  // Animation loop
  app.ticker.add(() => {
    snowflakes.forEach((flake) => {
      flake.sprite.y += flake.speed;
      flake.sprite.x += Math.sin(flake.sprite.y * 0.02) * flake.drift;
      flake.sprite.rotation += flake.rotationSpeed;

      //  Reset snowflake position when reaching the bottom
      if (flake.sprite.y > app.screen.height) {
        flake.sprite.y = cloud.y + cloudHeight / 2 + Math.random() * 10;
        flake.sprite.x = cloud.x - 40 + Math.random() * 80;
        flake.sprite.alpha = Math.random() * 0.6 + 0.4;
      }
    });
  });
};

export default createSnowAnimation;
