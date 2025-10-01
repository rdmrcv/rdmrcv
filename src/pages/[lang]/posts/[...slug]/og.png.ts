import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SUPPORTED_LANGS, type SupportedLang } from '../../../../utils/i18n';
import { getVersionedPostOgImage } from '../../../../utils/og';

interface OgProps {
  title: string;
  description: string;
  date: string;
  kicker: string;
}

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return posts
    .filter((entry) => SUPPORTED_LANGS.includes(entry.data.lang as SupportedLang))
    .map((entry) => {
      const [langSegment, ...slugSegments] = entry.slug.split('/');
      const lang = langSegment as SupportedLang;
      const slugPath = slugSegments.join('/');
      const dateLabel = new Intl.DateTimeFormat(lang, { dateStyle: 'long' }).format(entry.data.date);
      const title = entry.data.openGraph?.title ?? entry.data.title;
      const descriptionSource = entry.data.openGraph?.description ?? entry.data.description ?? '';
      const description = descriptionSource || entry.data.title;
      const kicker = lang === 'fr' ? 'Article' : 'Feature';

      return {
        params: {
          lang,
          slug: slugPath
        },
        props: {
          title,
          description,
          date: dateLabel,
          kicker
        }
      };
    });
}

export const prerender = true;

export const GET: APIRoute = async ({ request, site, props }) => {
  const { title, description, date, kicker } = props as OgProps;

  const baseHostname = site ? new URL(site).hostname : new URL(request.url).hostname;
  const siteLabel = baseHostname.replace(/^www\./, '');

  const { body } = await getVersionedPostOgImage({
    title,
    description,
    date,
    kicker,
    siteLabel
  });

  const responseBody = body as BodyInit;

  return new Response(responseBody, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=0, s-maxage=86400'
    }
  });
};
