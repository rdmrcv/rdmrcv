import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";

const WIDTH = 1200;
const HEIGHT = 630;

const require = createRequire(import.meta.url);

const fontRegularPromise = readFile(
  require.resolve("@fontsource/manrope/files/manrope-latin-400-normal.woff"),
);
const fontBoldPromise = readFile(
  require.resolve("@fontsource/manrope/files/manrope-latin-700-normal.woff"),
);

export interface OgImageContent {
  name: string;
  title: string;
  kicker?: string;
  location?: string;
  openTo?: string;
  relocation?: string;
  email?: string;
  siteLabel?: string;
}

export interface PostOgImageContent {
  title: string;
  description: string;
  date: string;
  siteLabel?: string;
  kicker?: string;
}

const BORDER_COLOR = "#dde3e8";
const MUTED_COLOR = "#454c53";
const BACKGROUND_COLOR = "#ffffff";
const DOT_PATTERN_HEIGHT = 240;
const DOT_CELL = 10;
const SQUIRCLE_SCALE = 3;

const randomHue = () => Math.floor(Math.random() * 360);
const accentColorFromHue = (hue: number) => ({
  fill: `hsl(${hue} 80% 55%)`,
  outline: `hsl(${hue} 80% 40%)`,
});

const seedFrom = (value: string) => {
  let seed = 0;
  for (let i = 0; i < value.length; i += 1) {
    seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
  }
  return seed || 1;
};

const buildDotPattern = (options: {
  width: number;
  height: number;
  seed: number;
  cell: number;
  color: string;
  outlineColor: string;
  densityTop: number;
  densityBottom: number;
}) => {
  const {
    width,
    height,
    seed,
    cell,
    color,
    outlineColor,
    densityTop,
    densityBottom,
  } = options;
  let state = seed;
  const rand = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const formatNumber = (value: number) => value.toFixed(2);
  const squirclePath = (centerX: number, centerY: number, radius: number) => {
    const size = radius * 2;
    const corner = radius * 0.65;
    const x = centerX - radius;
    const y = centerY - radius;
    const endX = x + size;
    const endY = y + size;
    const cornerX = x + corner;
    const cornerY = y + corner;
    const cornerX2 = endX - corner;
    const cornerY2 = endY - corner;
    return [
      `M${formatNumber(cornerX)} ${formatNumber(y)}`,
      `L${formatNumber(cornerX2)} ${formatNumber(y)}`,
      `Q${formatNumber(endX)} ${formatNumber(y)} ${formatNumber(
        endX,
      )} ${formatNumber(cornerY)}`,
      `L${formatNumber(endX)} ${formatNumber(cornerY2)}`,
      `Q${formatNumber(endX)} ${formatNumber(endY)} ${formatNumber(
        cornerX2,
      )} ${formatNumber(endY)}`,
      `L${formatNumber(cornerX)} ${formatNumber(endY)}`,
      `Q${formatNumber(x)} ${formatNumber(endY)} ${formatNumber(
        x,
      )} ${formatNumber(cornerY2)}`,
      `L${formatNumber(x)} ${formatNumber(cornerY)}`,
      `Q${formatNumber(x)} ${formatNumber(y)} ${formatNumber(
        cornerX,
      )} ${formatNumber(y)}`,
      "Z",
    ].join(" ");
  };

  const step = cell * 1.6;
  const columns = Math.ceil(width / step);
  let previousRow = new Array(columns).fill(null);
  const phaseA = rand() * Math.PI * 2;
  const phaseB = rand() * Math.PI * 2;
  const freqA = 0.01 + rand() * 0.02;
  const freqB = 0.05 + rand() * 0.08;
  const minGap = step * 0.2;
  const edgePadding = 1;
  const squircles: string[] = [];

  for (let y = 0; y < height; y += step) {
    const t = y / height;
    const base = densityTop * (1 - t) + densityBottom * t;
    const wave =
      0.12 * Math.sin(y * freqA + phaseA) + 0.08 * Math.sin(y * freqB + phaseB);
    const probability = Math.min(0.85, Math.max(0, base + wave));
    const row = new Array(columns).fill(null);

    for (let x = 0; x < width; x += step) {
      if (rand() > probability) continue;
      const jitter = step * 0.3;
      const cx = x + step * 0.5 + (rand() - 0.5) * jitter;
      const cy = y + step * 0.5 + (rand() - 0.5) * jitter;
      const radius = cell * (0.14 + 0.24 * rand()) * SQUIRCLE_SCALE;
      if (
        cx - radius < edgePadding ||
        cx + radius > width - edgePadding ||
        cy - radius < edgePadding ||
        cy + radius > height - edgePadding
      ) {
        continue;
      }
      const colIndex = Math.floor(x / step);
      let overlaps = false;
      for (let dx = -1; dx <= 1; dx += 1) {
        const neighbor = row[colIndex + dx] || previousRow[colIndex + dx];
        if (!neighbor) continue;
        const dxp = cx - neighbor.cx;
        const dyp = cy - neighbor.cy;
        const minDistance = radius + neighbor.radius + minGap;
        if (dxp * dxp + dyp * dyp < minDistance * minDistance) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) continue;
      const opacity = 0.25 + 0.55 * rand();
      const opacityValue = opacity.toFixed(3);
      const path = squirclePath(cx, cy, radius);
      squircles.push(
        `<path d="${path}" fill="${color}" fill-opacity="${opacityValue}" />`,
      );
      if (radius * 2 >= 5) {
        const outlineRadius = radius - 0.5;
        if (outlineRadius > 0) {
          squircles.push(
            `<path d="${squirclePath(
              cx,
              cy,
              outlineRadius,
            )}" fill="none" stroke="${outlineColor}" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" stroke-opacity="${opacityValue}" />`,
          );
        }
      }
      row[colIndex] = { cx, cy, radius };
    }
    previousRow = row;
  }

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>${squircles.join(
    "",
  )}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const truncateText = (value: string, maxLength: number) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const slicePoint = Math.max(0, maxLength - 3);
  const sliced = normalized.slice(0, slicePoint);
  const lastSpace = sliced.lastIndexOf(" ");
  const trimmed =
    lastSpace > slicePoint - 20 ? sliced.slice(0, lastSpace) : sliced;
  return `${trimmed.trimEnd()}...`;
};

const buildTemplate = (data: OgImageContent) => {
  const desiredLocation = [
    data.openTo ?? null,
    data.relocation ? `Relocation: ${data.relocation}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const accent = accentColorFromHue(randomHue());
  const dotPattern = buildDotPattern({
    width: WIDTH,
    height: DOT_PATTERN_HEIGHT,
    seed: seedFrom(data.name),
    cell: DOT_CELL,
    color: accent.fill,
    outlineColor: accent.outline,
    densityTop: 0.55,
    densityBottom: 0.05,
  });

  return {
    type: "div",
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: "flex",
        flexDirection: "row",
        background: BACKGROUND_COLOR,
        color: "#111111",
        padding: "64px 72px",
        boxSizing: "border-box",
        fontFamily: "Manrope",
        position: "relative",
        border: `1px solid ${BORDER_COLOR}`,
        overflow: "hidden",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0px",
              left: "0px",
              width: `${WIDTH}px`,
              height: `${DOT_PATTERN_HEIGHT}px`,
              backgroundImage: `url("${dotPattern}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${WIDTH}px ${DOT_PATTERN_HEIGHT}px`,
              backgroundPosition: "top left",
              opacity: 1,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              flex: 1,
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 1,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "120px",
                    lineHeight: 1.02,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                  },
                  children: data.name,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    marginTop: "28px",
                    fontSize: "36px",
                    lineHeight: 1.15,
                    fontWeight: 600,
                  },
                  children: data.title,
                },
              },
              data.kicker
                ? {
                    type: "div",
                    props: {
                      style: {
                        marginTop: "18px",
                        fontSize: "26px",
                        lineHeight: 1.4,
                        color: MUTED_COLOR,
                        maxWidth: "600px",
                      },
                      children: data.kicker,
                    },
                  }
                : null,
              {
                type: "div",
                props: {
                  style: {
                    marginTop: "auto",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    fontSize: "22px",
                    color: MUTED_COLOR,
                  },
                  children: [
                    data.location || desiredLocation
                      ? {
                          type: "div",
                          props: {
                            style: {
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            },
                            children: [
                              data.location
                                ? {
                                    type: "div",
                                    props: {
                                      style: {
                                        fontWeight: 600,
                                        color: "#111111",
                                      },
                                      children: data.location,
                                    },
                                  }
                                : null,
                              desiredLocation
                                ? {
                                    type: "div",
                                    props: {
                                      style: {
                                        fontSize: "20px",
                                      },
                                      children: desiredLocation,
                                    },
                                  }
                                : null,
                            ].filter(Boolean),
                          },
                        }
                      : null,
                    data.siteLabel || data.email
                      ? {
                          type: "div",
                          props: {
                            style: {
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-end",
                              gap: "6px",
                              textAlign: "right",
                            },
                            children: [
                              data.siteLabel
                                ? {
                                    type: "div",
                                    props: {
                                      style: {
                                        fontSize: "40px",
                                        fontWeight: 600,
                                        color: "#111111",
                                      },
                                      children: data.siteLabel,
                                    },
                                  }
                                : null,
                              data.email
                                ? {
                                    type: "div",
                                    props: {
                                      style: {
                                        fontSize: "40px",
                                      },
                                      children: data.email,
                                    },
                                  }
                                : null,
                            ].filter(Boolean),
                          },
                        }
                      : null,
                  ].filter(Boolean),
                },
              },
            ].filter(Boolean),
          },
        },
      ],
    },
  };
};

const buildPostTemplate = (data: PostOgImageContent) => {
  const accent = accentColorFromHue(randomHue());
  const dotPattern = buildDotPattern({
    width: WIDTH,
    height: DOT_PATTERN_HEIGHT,
    seed: seedFrom(data.title),
    cell: DOT_CELL,
    color: accent.fill,
    outlineColor: accent.outline,
    densityTop: 0.5,
    densityBottom: 0.05,
  });
  return {
    type: "div",
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: "flex",
        flexDirection: "column",
        background: BACKGROUND_COLOR,
        color: "#111111",
        padding: "72px",
        boxSizing: "border-box",
        fontFamily: "Manrope",
        border: `1px solid ${BORDER_COLOR}`,
        position: "relative",
        overflow: "hidden",
        gap: "24px",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "0px",
              left: "0px",
              width: `${WIDTH}px`,
              height: `${DOT_PATTERN_HEIGHT}px`,
              backgroundImage: `url("${dotPattern}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${WIDTH}px ${DOT_PATTERN_HEIGHT}px`,
              backgroundPosition: "top left",
              opacity: 1,
            },
          },
        },
        data.kicker
          ? {
              type: "div",
              props: {
                style: {
                  fontSize: "22px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: MUTED_COLOR,
                  position: "relative",
                  zIndex: 1,
                },
                children: data.kicker,
              },
            }
          : null,
        {
          type: "div",
          props: {
            style: {
              fontSize: "28px",
              color: MUTED_COLOR,
              position: "relative",
              zIndex: 1,
            },
            children: data.date,
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontSize: "68px",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              maxWidth: "960px",
              position: "relative",
              zIndex: 1,
            },
            children: data.title,
          },
        },
        data.description
          ? {
              type: "div",
              props: {
                style: {
                  fontSize: "32px",
                  lineHeight: 1.35,
                  color: MUTED_COLOR,
                  maxWidth: "960px",
                  position: "relative",
                  zIndex: 1,
                },
                children: data.description,
              },
            }
          : null,
        data.siteLabel
          ? {
              type: "div",
              props: {
                style: {
                  marginTop: "auto",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: MUTED_COLOR,
                  position: "relative",
                  zIndex: 1,
                },
                children: data.siteLabel,
              },
            }
          : null,
      ].filter(Boolean),
    },
  };
};

export const generateOgImage = async (data: OgImageContent) => {
  const [fontRegular, fontBold] = await Promise.all([
    fontRegularPromise,
    fontBoldPromise,
  ]);

  const svg = await satori(buildTemplate({ ...data }), {
    fonts: [
      {
        name: "Manrope",
        data: fontRegular,
        weight: 400,
        style: "normal",
      },
      {
        name: "Manrope",
        data: fontBold,
        weight: 700,
        style: "normal",
      },
    ],
    width: WIDTH,
    height: HEIGHT,
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: WIDTH,
    },
    background: BACKGROUND_COLOR,
  });

  return resvg.render().asPng();
};

export const generatePostOgImage = async (data: PostOgImageContent) => {
  const [fontRegular, fontBold] = await Promise.all([
    fontRegularPromise,
    fontBoldPromise,
  ]);

  const svg = await satori(
    buildPostTemplate({
      ...data,
      description: truncateText(data.description, 220),
    }),
    {
      fonts: [
        {
          name: "Manrope",
          data: fontRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Manrope",
          data: fontBold,
          weight: 700,
          style: "normal",
        },
      ],
      width: WIDTH,
      height: HEIGHT,
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "width",
      value: WIDTH,
    },
    background: BACKGROUND_COLOR,
  });

  return resvg.render().asPng();
};

const ogImageCache = new Map<string, { hash: string; body: Uint8Array }>();
const postImageCache = new Map<string, { hash: string; body: Uint8Array }>();

const createCacheKey = (data: object) => JSON.stringify(data);

const hashBuffer = (buffer: Uint8Array) =>
  createHash("sha256").update(buffer).digest("hex").slice(0, 12);

const getCachedImage = async (
  cache: Map<string, { hash: string; body: Uint8Array }>,
  key: string,
  generator: () => Promise<Uint8Array>,
) => {
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }

  const body = await generator();
  const hash = hashBuffer(body);
  const entry = { hash, body };
  cache.set(key, entry);
  return entry;
};

export const getVersionedOgImage = async (data: OgImageContent) => {
  const key = createCacheKey(data);
  return getCachedImage(ogImageCache, key, async () => {
    const png = await generateOgImage(data);
    return new Uint8Array(png);
  });
};

export const getVersionedPostOgImage = async (data: PostOgImageContent) => {
  const key = createCacheKey(data);
  return getCachedImage(postImageCache, key, async () => {
    const png = await generatePostOgImage(data);
    return new Uint8Array(png);
  });
};
