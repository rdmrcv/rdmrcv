import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { type SupportedLang } from '../../utils/i18n';
import { getVersionedOgImage } from '../../utils/og';

export async function getStaticPaths() {
  const profiles = await getCollection('profile');
  return profiles.map((entry) => ({ params: { lang: entry.slug as SupportedLang } }));
}

export const prerender = true;

export const GET: APIRoute = async ({ request, params, site }) => {
  const lang = params.lang as SupportedLang;

  const profile = await getEntry('profile', lang);

  if (!profile) {
    return new Response('Not found', { status: 404 });
  }

  const data = profile.data;

  const baseHostname = site ? new URL(site).hostname : new URL(request.url).hostname;
  const siteLabel = baseHostname.replace(/^www\./, '');

  const { body } = await getVersionedOgImage({
    name: data.name,
    title: data.title,
    kicker: data.kicker,
    location: data.location,
    openTo: data.openTo,
    relocation: data.relocation,
    email: data.contact?.email,
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
