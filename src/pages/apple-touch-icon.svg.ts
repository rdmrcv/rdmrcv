import type { APIRoute } from 'astro';
import { getAppleTouchIconSvg } from '../utils/favicon';

export const prerender = true;

export const GET: APIRoute = async () => {
  const body = getAppleTouchIconSvg();

  return new Response(body, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=0, s-maxage=86400'
    }
  });
};
