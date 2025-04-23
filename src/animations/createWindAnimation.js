import { Assets, Sprite, MeshRope, Point } from 'pixi.js';

const createWindAnimation = async (app) => {
  const windAssets = [
    'assets/weather/cloud.png',
    'assets/weather/windgust1.png',
    'assets/weather/windgust2.png',
    'assets/weather/windgust3.png',
  ];

  await Assets.load(windAssets);
  const [cloudTexture, windGustTexture1, windGustTexture2, windGustTexture3] =
    windAssets.map((asset) => Assets.get(asset));

  // Create and position the cloud sprite
  const cloud = new Sprite(cloudTexture);
  cloud.anchor.set(0.5);
  cloud.x = app.screen.width / 2;
  cloud.y = app.screen.height / 3;
  cloud.scale.set(0.07);
  app.stage.addChild(cloud);

  // Define wind gust textures and movement properties
  const windGustTextures = [
    {
      texture: windGustTexture1,
      baseScale: 0.4,
      xOffset: -5,
      yOffset: 0,
      widthSpeed: 0.12,
      moveSpeed: 0.03,
    },
    {
      texture: windGustTexture2,
      baseScale: 0.5,
      xOffset: 20,
      yOffset: 20,
      widthSpeed: 0.12,
      moveSpeed: 0.035,
    },
    {
      texture: windGustTexture3,
      baseScale: 0.5,
      xOffset: 0,
      yOffset: 65,
      widthSpeed: 0.14,
      moveSpeed: 0.04,
    },
  ];

  const gustStartY = cloud.y + 15;

  // Define properties for wind gust movement
  const numSegments = 50;
  const baseRopeLength = 250;
  const ropeLengths = [
    baseRopeLength * 0.8,
    baseRopeLength,
    baseRopeLength * 0.6,
  ];

  const windGusts = [];

  // Create each wind gust
  windGustTextures.forEach(
    (
      { texture, baseScale, xOffset, yOffset, widthSpeed, moveSpeed },
      index
    ) => {
      const points = [];

      for (let i = 0; i < numSegments; i++) {
        points.push(new Point(i * (ropeLengths[index] / numSegments), 0));
      }

      const windGust = new MeshRope({
        texture,
        points,
      });

      // Position each wind gust on the screen
      windGust.x = app.screen.width / 2 - 80 + xOffset;
      windGust.y = gustStartY + yOffset;
      windGust.scale.set(baseScale, 0.1);
      app.stage.addChild(windGust);

      windGusts.push({
        rope: windGust,
        baseScale,
        widthSpeed,
        moveSpeed,
        initialX: windGust.x,
        countOffset: Math.random() * Math.PI * 2,
      });
    }
  );

  let count = 0;

  // Animation loop: Moves the wind gusts horizontally
  app.ticker.add(() => {
    count += 0.19;

    windGusts.forEach(
      ({ rope, baseScale, widthSpeed, moveSpeed, initialX, countOffset }) => {
        const scaleFactor =
          1 + Math.sin(count * widthSpeed + countOffset) * 0.12;
        rope.scale.x = baseScale * scaleFactor;

        const horizontalShift = Math.sin(count * moveSpeed + countOffset) * 10;
        rope.x = initialX + horizontalShift;
      }
    );
  });
};

export default createWindAnimation;
