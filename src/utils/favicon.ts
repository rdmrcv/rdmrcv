const randomHue = () => Math.floor(Math.random() * 360);
const HUE = randomHue();
const FILL_COLOR = `hsl(${HUE} 80% 55%)`;
const OUTLINE_COLOR = `hsl(${HUE} 80% 40%)`;

const squirclePath = (size: number, inset: number) => {
  const radius = (size - inset * 2) / 2;
  const corner = radius * 0.65;
  const x = inset;
  const y = inset;
  const endX = x + radius * 2;
  const endY = y + radius * 2;
  const cornerX = x + corner;
  const cornerY = y + corner;
  const cornerX2 = endX - corner;
  const cornerY2 = endY - corner;
  const formatNumber = (value: number) => value.toFixed(2);

  return [
    `M${formatNumber(cornerX)} ${formatNumber(y)}`,
    `L${formatNumber(cornerX2)} ${formatNumber(y)}`,
    `Q${formatNumber(endX)} ${formatNumber(y)} ${formatNumber(endX)} ${formatNumber(cornerY)}`,
    `L${formatNumber(endX)} ${formatNumber(cornerY2)}`,
    `Q${formatNumber(endX)} ${formatNumber(endY)} ${formatNumber(cornerX2)} ${formatNumber(endY)}`,
    `L${formatNumber(cornerX)} ${formatNumber(endY)}`,
    `Q${formatNumber(x)} ${formatNumber(endY)} ${formatNumber(x)} ${formatNumber(cornerY2)}`,
    `L${formatNumber(x)} ${formatNumber(cornerY)}`,
    `Q${formatNumber(x)} ${formatNumber(y)} ${formatNumber(cornerX)} ${formatNumber(y)}`,
    'Z'
  ].join(' ');
};

const buildFaviconSvg = (size: number) => {
  const inset = Math.max(2, Math.round(size * 0.08));
  const strokeWidth = Math.max(2, Math.round(size * 0.08));
  const path = squirclePath(size, inset + strokeWidth * 0.5);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <path d="${path}" fill="${FILL_COLOR}" stroke="${OUTLINE_COLOR}" stroke-width="${strokeWidth}" stroke-linejoin="round" />
</svg>`;
};

export const getFaviconSvg = () => buildFaviconSvg(64);

export const getAppleTouchIconSvg = () => buildFaviconSvg(180);
