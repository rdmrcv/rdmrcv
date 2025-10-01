import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;

const require = createRequire(import.meta.url);

const fontRegularPromise = readFile(
  require.resolve('@fontsource/manrope/files/manrope-latin-400-normal.woff')
);
const fontBoldPromise = readFile(
  require.resolve('@fontsource/manrope/files/manrope-latin-700-normal.woff')
);

const photoPromise = readFile(resolve(process.cwd(), 'src/assets/pictures/photo.jpeg'));

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

const ACCENT_COLOR = '#ef7554';
const BORDER_COLOR = '#dde3e8';
const MUTED_COLOR = '#454c53';
const BACKGROUND_COLOR = '#fcfcfc';
const PHOTO_BACKGROUND = '#f4f6f8';

const truncateText = (value: string, maxLength: number) => {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const slicePoint = Math.max(0, maxLength - 3);
  const sliced = normalized.slice(0, slicePoint);
  const lastSpace = sliced.lastIndexOf(' ');
  const trimmed = lastSpace > slicePoint - 20 ? sliced.slice(0, lastSpace) : sliced;
  return `${trimmed.trimEnd()}...`;
};

const buildTemplate = (data: OgImageContent & { photoSrc: string }) => {
  const desiredLocation = [
    data.openTo ?? null,
    data.relocation ? `Relocation: ${data.relocation}` : null
  ]
    .filter(Boolean)
    .join(' · ');

  return {
    type: 'div',
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: 'flex',
        flexDirection: 'row',
        background: BACKGROUND_COLOR,
        color: '#111111',
        padding: '64px 72px',
        boxSizing: 'border-box',
        fontFamily: 'Manrope',
        position: 'relative',
        border: `1px solid ${BORDER_COLOR}`,
        overflow: 'hidden'
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '48px',
              right: '72px',
              width: '88px',
              height: '10px',
              background: ACCENT_COLOR
            }
          }
        },
        {
          type: 'div',
          props: {
            style: {
              width: '320px',
              marginRight: '72px',
              display: 'flex',
              flexDirection: 'column'
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    border: `1px solid ${BORDER_COLOR}`,
                    background: PHOTO_BACKGROUND,
                    padding: '18px',
                    borderRadius: '8px',
                    width: '320px',
                    height: '420px',
                    display: 'flex',
                    alignItems: 'stretch',
                    boxSizing: 'border-box'
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: data.photoSrc,
                        style: {
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          borderRadius: '4px'
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          type: 'div',
          props: {
            style: {
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '72px',
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: '-0.01em'
                  },
                  children: data.name
                }
              },
              {
                type: 'div',
                props: {
                  style: {
                    marginTop: '28px',
                    fontSize: '36px',
                    lineHeight: 1.15,
                    fontWeight: 600
                  },
                  children: data.title
                }
              },
              data.kicker
                ? {
                    type: 'div',
                    props: {
                      style: {
                        marginTop: '18px',
                        fontSize: '26px',
                        lineHeight: 1.4,
                        color: MUTED_COLOR,
                        maxWidth: '600px'
                      },
                      children: data.kicker
                    }
                  }
                : null,
              {
                type: 'div',
                props: {
                  style: {
                    marginTop: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    fontSize: '22px',
                    color: MUTED_COLOR
                  },
                  children: [
                    data.location || desiredLocation
                      ? {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '8px'
                            },
                            children: [
                              data.location
                                ? {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontWeight: 600,
                                        color: '#111111'
                                      },
                                      children: data.location
                                    }
                                  }
                                : null,
                              desiredLocation
                                ? {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontSize: '20px'
                                      },
                                      children: desiredLocation
                                    }
                                  }
                                : null
                            ].filter(Boolean)
                          }
                        }
                      : null,
                    data.siteLabel || data.email
                      ? {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'flex-end',
                              gap: '6px',
                              textAlign: 'right'
                            },
                            children: [
                              data.siteLabel
                                ? {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontWeight: 600,
                                        color: '#111111'
                                      },
                                      children: data.siteLabel
                                    }
                                  }
                                : null,
                              data.email
                                ? {
                                    type: 'div',
                                    props: {
                                      style: {
                                        fontSize: '20px'
                                      },
                                      children: data.email
                                    }
                                  }
                                : null
                            ].filter(Boolean)
                          }
                        }
                      : null
                  ].filter(Boolean)
                }
              }
            ].filter(Boolean)
          }
        }
      ]
    }
  };
};

const buildPostTemplate = (data: PostOgImageContent) => {
  return {
    type: 'div',
    props: {
      style: {
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        display: 'flex',
        flexDirection: 'column',
        background: BACKGROUND_COLOR,
        color: '#111111',
        padding: '72px',
        boxSizing: 'border-box',
        fontFamily: 'Manrope',
        border: `1px solid ${BORDER_COLOR}`,
        position: 'relative',
        overflow: 'hidden',
        gap: '24px'
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              top: '60px',
              right: '72px',
              width: '120px',
              height: '10px',
              background: ACCENT_COLOR
            }
          }
        },
        data.kicker
          ? {
              type: 'div',
              props: {
                style: {
                  fontSize: '22px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: MUTED_COLOR
                },
                children: data.kicker
              }
            }
          : null,
        {
          type: 'div',
          props: {
            style: {
              fontSize: '28px',
              color: MUTED_COLOR
            },
            children: data.date
          }
        },
        {
          type: 'div',
          props: {
            style: {
              fontSize: '68px',
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              maxWidth: '960px'
            },
            children: data.title
          }
        },
        data.description
          ? {
              type: 'div',
              props: {
                style: {
                  fontSize: '32px',
                  lineHeight: 1.35,
                  color: MUTED_COLOR,
                  maxWidth: '960px'
                },
                children: data.description
              }
            }
          : null,
        data.siteLabel
          ? {
              type: 'div',
              props: {
                style: {
                  marginTop: 'auto',
                  fontSize: '24px',
                  fontWeight: 600,
                  color: MUTED_COLOR
                },
                children: data.siteLabel
              }
            }
          : null
      ].filter(Boolean)
    }
  };
};

export const generateOgImage = async (data: OgImageContent) => {
  const [fontRegular, fontBold, photo] = await Promise.all([fontRegularPromise, fontBoldPromise, photoPromise]);

  const photoSrc = `data:image/jpeg;base64,${Buffer.from(photo).toString('base64')}`;

  const svg = await satori(buildTemplate({ ...data, photoSrc }), {
    fonts: [
      {
        name: 'Manrope',
        data: fontRegular,
        weight: 400,
        style: 'normal'
      },
      {
        name: 'Manrope',
        data: fontBold,
        weight: 700,
        style: 'normal'
      }
    ],
    width: WIDTH,
    height: HEIGHT
  });

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: WIDTH
    },
    background: '#ffffff'
  });

  return resvg.render().asPng();
};

export const generatePostOgImage = async (data: PostOgImageContent) => {
  const [fontRegular, fontBold] = await Promise.all([fontRegularPromise, fontBoldPromise]);

  const svg = await satori(
    buildPostTemplate({
      ...data,
      description: truncateText(data.description, 220)
    }),
    {
      fonts: [
        {
          name: 'Manrope',
          data: fontRegular,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'Manrope',
          data: fontBold,
          weight: 700,
          style: 'normal'
        }
      ],
      width: WIDTH,
      height: HEIGHT
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: WIDTH
    },
    background: '#ffffff'
  });

  return resvg.render().asPng();
};
