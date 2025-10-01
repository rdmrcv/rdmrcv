interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const MONOGRAM_LABEL = 'RD';
const BACKGROUND_COLOR: RgbColor = { r: 10, g: 10, b: 13 };
const BACKGROUND_COLOR_CSS = `rgb(${BACKGROUND_COLOR.r} ${BACKGROUND_COLOR.g} ${BACKGROUND_COLOR.b})`;
const MIN_TARGET_APCA = 50;
const MAX_TARGET_APCA = 62;
const MAX_ACCEPTED_APCA = 66;
const MAX_COLOR_ATTEMPTS = 120;
const MIN_SATURATION = 22;
const MAX_SATURATION = 45;
const MIN_LIGHTNESS = 35;
const MAX_LIGHTNESS = 72;
const LIGHTNESS_SEARCH_STEPS = 11;
const MAX_CHANNEL_VALUE = 200;
const MAX_CHANNEL_SPREAD = 130;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFloat = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const toRgbChannel = (value: number) => Math.round(value * 255);

const hslToRgb = (
  hue: number,
  saturation: number,
  lightness: number,
): RgbColor => {
  const normalizedHue = ((hue % 360) + 360) % 360;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const hueSector = normalizedHue / 60;
  const secondComponent = chroma * (1 - Math.abs((hueSector % 2) - 1));
  let redPrime = 0;
  let greenPrime = 0;
  let bluePrime = 0;

  if (hueSector >= 0 && hueSector < 1) {
    redPrime = chroma;
    greenPrime = secondComponent;
  } else if (hueSector >= 1 && hueSector < 2) {
    redPrime = secondComponent;
    greenPrime = chroma;
  } else if (hueSector >= 2 && hueSector < 3) {
    greenPrime = chroma;
    bluePrime = secondComponent;
  } else if (hueSector >= 3 && hueSector < 4) {
    greenPrime = secondComponent;
    bluePrime = chroma;
  } else if (hueSector >= 4 && hueSector < 5) {
    redPrime = secondComponent;
    bluePrime = chroma;
  } else {
    redPrime = chroma;
    bluePrime = secondComponent;
  }

  const match = lightness - chroma / 2;

  return {
    r: toRgbChannel(redPrime + match),
    g: toRgbChannel(greenPrime + match),
    b: toRgbChannel(bluePrime + match),
  };
};

const relativeLuminance = (rgbColor: RgbColor) => {
  const red = Math.pow(rgbColor.r / 255, 2.4);
  const green = Math.pow(rgbColor.g / 255, 2.4);
  const blue = Math.pow(rgbColor.b / 255, 2.4);

  return red * 0.2126729 + green * 0.7151522 + blue * 0.072175;
};

const applyBlackSoftClamp = (luminance: number) => {
  const blackThreshold = 0.022;

  if (luminance > blackThreshold) {
    return luminance;
  }

  return luminance + Math.pow(blackThreshold - luminance, 1.414);
};

const getApcaContrast = (textColor: RgbColor, backgroundColor: RgbColor) => {
  const normalTextExponent = 0.57;
  const normalBackgroundExponent = 0.56;
  const reverseTextExponent = 0.62;
  const reverseBackgroundExponent = 0.65;
  const normalPolarityScale = 1.14;
  const reversePolarityScale = 1.14;
  const lowContrastClip = 0.1;
  const normalPolarityOffset = 0.027;
  const reversePolarityOffset = 0.027;
  const minimumLuminanceDelta = 0.0005;

  const textLuminance = applyBlackSoftClamp(relativeLuminance(textColor));
  const backgroundLuminance = applyBlackSoftClamp(
    relativeLuminance(backgroundColor),
  );
  const luminanceDelta = Math.abs(backgroundLuminance - textLuminance);

  if (luminanceDelta < minimumLuminanceDelta) {
    return 0;
  }

  if (backgroundLuminance > textLuminance) {
    const sapc =
      (Math.pow(backgroundLuminance, normalBackgroundExponent) -
        Math.pow(textLuminance, normalTextExponent)) *
      normalPolarityScale;

    return (sapc < lowContrastClip ? 0 : sapc - normalPolarityOffset) * 100;
  }

  const sapc =
    (Math.pow(backgroundLuminance, reverseBackgroundExponent) -
      Math.pow(textLuminance, reverseTextExponent)) *
    reversePolarityScale;

  return (sapc > -lowContrastClip ? 0 : sapc + reversePolarityOffset) * 100;
};

const pickMonogramColor = () => {
  for (let attempt = 0; attempt < MAX_COLOR_ATTEMPTS; attempt += 1) {
    const hue = randomInt(0, 359);
    const saturation = randomInt(MIN_SATURATION, MAX_SATURATION);
    const targetContrast = randomFloat(MIN_TARGET_APCA, MAX_TARGET_APCA);
    let lowLightness = MIN_LIGHTNESS;
    let highLightness = MAX_LIGHTNESS;
    let selectedColor: RgbColor | undefined;
    let selectedContrast = 0;

    for (let step = 0; step < LIGHTNESS_SEARCH_STEPS; step += 1) {
      const currentLightness = (lowLightness + highLightness) / 2;
      const rgbColor = hslToRgb(hue, saturation / 100, currentLightness / 100);
      const contrast = Math.abs(getApcaContrast(rgbColor, BACKGROUND_COLOR));

      if (contrast >= targetContrast) {
        selectedColor = rgbColor;
        selectedContrast = contrast;
        highLightness = currentLightness;
      } else {
        lowLightness = currentLightness;
      }
    }

    if (!selectedColor) {
      continue;
    }

    const maxChannel = Math.max(
      selectedColor.r,
      selectedColor.g,
      selectedColor.b,
    );
    const minChannel = Math.min(
      selectedColor.r,
      selectedColor.g,
      selectedColor.b,
    );
    const channelSpread = maxChannel - minChannel;

    if (
      selectedContrast <= MAX_ACCEPTED_APCA &&
      maxChannel <= MAX_CHANNEL_VALUE &&
      channelSpread <= MAX_CHANNEL_SPREAD
    ) {
      return `rgb(${selectedColor.r} ${selectedColor.g} ${selectedColor.b})`;
    }
  }

  return 'rgb(117 168 189)';
};

const MONOGRAM_COLOR_CSS = pickMonogramColor();

const buildFaviconSvg = (size: number) => {
  const fontSize = size * 0.84;
  const textY = size * 0.79;
  const textLength = size * 0.96;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${BACKGROUND_COLOR_CSS}" />
  <text x="${(size / 2).toFixed(2)}" y="${textY.toFixed(2)}" fill="${MONOGRAM_COLOR_CSS}" font-family="'Apple Chancery', 'Snell Roundhand', 'Zapfino', 'Brush Script MT', 'Segoe Script', cursive" font-size="${fontSize.toFixed(2)}" font-weight="700" text-anchor="middle" textLength="${textLength.toFixed(2)}" lengthAdjust="spacingAndGlyphs">${MONOGRAM_LABEL}</text>
</svg>`;
};

export const getFaviconSvg = () => buildFaviconSvg(64);

export const getAppleTouchIconSvg = () => buildFaviconSvg(180);
