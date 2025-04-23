import { Assets, Sprite, Container } from 'pixi.js';

const createThunderAnimation = async (app) => {
  const thunderAssets = [
    'assets/weather/thundercloudbig2.png',
    'assets/weather/thundercloudsmall.png',
    'assets/weather/raindrop.png',
    'assets/weather/lighteningbolt.png',
  ];

  await Assets.load(thunderAssets);
  const [bigCloudTexture, smallCloudTexture, rainTexture, lightningTexture] =
    thunderAssets.map((asset) => Assets.get(asset));

  // Create a container for thunder elements
  const thunderContainer = new Container();
  app.stage.addChild(thunderContainer);

  // Large thunder cloud
  const bigCloud = new Sprite(bigCloudTexture);
  bigCloud.anchor.set(0.5);
  bigCloud.x = app.screen.width / 1.75;
  bigCloud.y = app.screen.height / 4;
  bigCloud.scale.set(0.08);
  thunderContainer.addChild(bigCloud);

  // Smaller thunder cloud
  const smallCloud = new Sprite(smallCloudTexture);
  smallCloud.anchor.set(0.5);
  smallCloud.x = app.screen.width / 3;
  smallCloud.y = app.screen.height / 2.5;
  smallCloud.scale.set(0.06);
  thunderContainer.addChild(smallCloud);

  // Lightning bolt
  const lightning = new Sprite(lightningTexture);
  lightning.anchor.set(0.5);
  lightning.x = app.screen.width / 1.6;
  lightning.y = app.screen.height / 1.25;
  lightning.scale.set(0.05);
  lightning.alpha = 0;
  thunderContainer.addChild(lightning);

  // Second lightning bolt on the left
  const lightningLeft = new Sprite(lightningTexture);
  lightningLeft.anchor.set(0.5);
  lightningLeft.x = app.screen.width / 2.4;
  lightningLeft.y = app.screen.height / 1.3;
  lightningLeft.scale.set(0.04);
  lightningLeft.alpha = 0;
  thunderContainer.addChild(lightningLeft);

  // Rain container to hold raindrops
  const rainContainer = new Container();
  app.stage.addChildAt(rainContainer, 0);

  // Create raindrops
  const numRaindrops = 300;
  const raindrops = [];
  const fullCloudWidth = bigCloud.width;
  const rainWidth = fullCloudWidth * 1;
  const leftEdge = bigCloud.x - rainWidth / 1.6;
  const cloudBottomY = bigCloud.y + bigCloud.height / 2;

  const randomRainX = () => leftEdge + Math.random() * rainWidth;

  for (let i = 0; i < numRaindrops; i++) {
    const raindrop = new Sprite(rainTexture);
    raindrop.anchor.set(0.5);
    raindrop.x = randomRainX();
    raindrop.y =
      cloudBottomY + Math.random() * (app.screen.height - cloudBottomY);
    raindrop.scale.set(0.0017 + Math.random() * 0.002);
    raindrop.alpha = Math.random() * 0.4 + 0.4;
    rainContainer.addChild(raindrop);
    raindrops.push({ sprite: raindrop, speed: Math.random() * 0.5 + 1 });
  }

  // Lightning timers
  let lightningTimer = Math.random() * 300 + 100;
  let lightningFlashDuration = 0;

  let lightningLeftTimer = Math.random() * 400 + 200;
  let lightningLeftFlashDuration = 0;

  // Cloud movement setup
  let bigCloudDirection = 1;
  let smallCloudDirection = -1;
  const bigCloudSpeed = 0.03;
  const smallCloudSpeed = 0.04;
  const bigCloudMinX = bigCloud.x - 5;
  const bigCloudMaxX = bigCloud.x + 5;
  const smallCloudMinX = smallCloud.x - 7;
  const smallCloudMaxX = smallCloud.x + 7;

  // Animation loop
  app.ticker.add(() => {
    // Move clouds
    bigCloud.x += bigCloudSpeed * bigCloudDirection;
    smallCloud.x += smallCloudSpeed * smallCloudDirection;

    if (bigCloud.x >= bigCloudMaxX || bigCloud.x <= bigCloudMinX) {
      bigCloudDirection *= -1;
    }
    if (smallCloud.x >= smallCloudMaxX || smallCloud.x <= smallCloudMinX) {
      smallCloudDirection *= -1;
    }

    // Move raindrops
    raindrops.forEach((drop) => {
      drop.sprite.y += drop.speed * 1.5;
      drop.sprite.x -= drop.speed * 0.5;
      drop.sprite.alpha -= 0.002;

      if (drop.sprite.y > app.screen.height || drop.sprite.x < 0) {
        drop.sprite.y = cloudBottomY + Math.random() * 10;
        drop.sprite.x = randomRainX();
        drop.sprite.alpha = Math.random() * 0.4 + 0.4;
      }
    });

    // Handle right-side lightning flash
    if (lightningTimer <= 0 && lightningFlashDuration <= 0) {
      lightning.alpha = 1;
      lightningFlashDuration = 40 + Math.random() * 30;
      lightningTimer = 200 + Math.random() * 300;
    }

    if (lightningFlashDuration > 0) {
      lightningFlashDuration--;

      if (lightningFlashDuration > 30) {
        lightning.alpha = 1;
      } else if (lightningFlashDuration > 20) {
        lightning.alpha = 0.7;
      } else if (lightningFlashDuration > 10) {
        lightning.alpha = 1;
      } else {
        lightning.alpha = Math.random() > 0.5 ? 1 : 0.4;
      }

      if (lightningFlashDuration <= 0) {
        lightning.alpha = 0;
      }
    } else {
      lightningTimer--;
    }

    // Handle left-side lightning flash
    if (lightningLeftTimer <= 0 && lightningLeftFlashDuration <= 0) {
      lightningLeft.alpha = 1;
      lightningLeftFlashDuration = 20 + Math.random() * 20;
      lightningLeftTimer = 300 + Math.random() * 200;
    }

    if (lightningLeftFlashDuration > 0) {
      lightningLeftFlashDuration--;

      if (lightningLeftFlashDuration > 15) {
        lightningLeft.alpha = 1;
      } else if (lightningLeftFlashDuration > 10) {
        lightningLeft.alpha = 0.7;
      } else if (lightningLeftFlashDuration > 5) {
        lightningLeft.alpha = Math.random() > 0.5 ? 1 : 0.4;
      }

      if (lightningLeftFlashDuration <= 0) {
        lightningLeft.alpha = 0;
      }
    } else {
      lightningLeftTimer--;
    }
  });
};

export default createThunderAnimation;
