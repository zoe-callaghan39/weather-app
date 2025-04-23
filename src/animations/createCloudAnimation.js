import { Container, Sprite, Assets } from 'pixi.js';

const createCloudAnimation = async (app) => {
  const cloudAssets = [
    'assets/weather/cloud.png',
    'assets/weather/bigcloud.png',
  ];

  await Assets.load(cloudAssets);
  const [bigCloudTexture, smallCloudTexture] = cloudAssets.map((asset) =>
    Assets.get(asset)
  );

  const cloudContainer = new Container();
  app.stage.addChild(cloudContainer);

  // Create Big Cloud
  const bigCloud = new Sprite(bigCloudTexture);
  bigCloud.anchor.set(0.5);
  bigCloud.x = app.screen.width / 1.75;
  bigCloud.y = app.screen.height / 3;
  bigCloud.scale.set(0.08);
  cloudContainer.addChild(bigCloud);

  // Create Small Cloud
  const smallCloud = new Sprite(smallCloudTexture);
  smallCloud.anchor.set(0.5);
  smallCloud.x = app.screen.width / 3;
  smallCloud.y = app.screen.height / 2;
  smallCloud.scale.set(0.06);
  cloudContainer.addChild(smallCloud);

  // Movement variables
  let bigCloudDirection = 1;
  let smallCloudDirection = -1;

  const bigCloudMinX = bigCloud.x - 3;
  const bigCloudMaxX = bigCloud.x + 6;

  const smallCloudMinX = smallCloud.x - 9;
  const smallCloudMaxX = smallCloud.x + 9;

  // Randomised movement speeds
  const bigCloudSpeed = 0.03 + Math.random() * 0.02;
  const smallCloudSpeed = 0.05 + Math.random() * 0.02;

  // Cloud movement animation
  app.ticker.add(() => {
    bigCloud.x += bigCloudSpeed * bigCloudDirection;
    if (bigCloud.x >= bigCloudMaxX || bigCloud.x <= bigCloudMinX) {
      bigCloudDirection *= -1;
    }

    smallCloud.x += smallCloudSpeed * smallCloudDirection;
    if (smallCloud.x >= smallCloudMaxX || smallCloud.x <= smallCloudMinX) {
      smallCloudDirection *= -1;
    }
  });
};

export default createCloudAnimation;
