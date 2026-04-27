import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const prerender = true;

const STATIC_ROUTE_EXCLUSIONS = new Set(["/404/"]);

const pageModules = Object.keys(
  import.meta.glob("/src/pages/**/*.{astro,md,mdx}")
);

const normalizeRouteFromPageModule = (modulePath: string): string | null => {
  if (modulePath.includes("/[")) {
    return null;
  }

  const route = modulePath
    .replace("/src/pages", "")
    .replace(/\/index\.(astro|md|mdx)$/, "/")
    .replace(/\.(astro|md|mdx)$/, "/");

  const normalized = route.startsWith("/") ? route : `/${route}`;
  const withSingleTrailingSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;

  if (STATIC_ROUTE_EXCLUSIONS.has(withSingleTrailingSlash)) {
    return null;
  }

  return withSingleTrailingSlash;
};

const toIsoDate = (value: Date | string | undefined): string | undefined => {
  if (!value) return undefined;
  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
};

export const GET: APIRoute = async ({ site, url }) => {
  const baseUrl = site ?? new URL(url.origin);

  const staticRoutes = pageModules
    .map(normalizeRouteFromPageModule)
    .filter((route): route is string => Boolean(route));

  const blogEntries = await getCollection("blog");
  const eventEntries = await getCollection("events");
  const shopEntries = await getCollection("shops");

  const dynamicRoutes = [
    ...blogEntries.map((entry) => ({
      path: `/news/${entry.slug}/`,
      lastmod: toIsoDate(entry.data.publishDate)
    })),
    ...eventEntries.map((entry) => ({
      path: `/events/${entry.slug}/`,
      lastmod: toIsoDate(entry.data.eventDate)
    })),
    ...shopEntries.map((entry) => ({
      path: `/shops/${entry.slug}/`
    }))
  ];

  const staticRouteObjects = staticRoutes.map((path) => ({ path }));
  const urls = [...staticRouteObjects, ...dynamicRoutes].sort((a, b) => a.path.localeCompare(b.path));

  const xmlBody = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(({ path, lastmod }) => {
      const loc = new URL(path, baseUrl).toString();
      const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmodTag}\n  </url>`;
    })
    .join("\n")}\n</urlset>\n`;

  return new Response(xmlBody, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
