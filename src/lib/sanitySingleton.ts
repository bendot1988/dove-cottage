import { sanityClient } from "./sanity";

export async function fetchSingletonPageJson<T>(pageKey: string): Promise<T | null> {
  const doc = await sanityClient.fetch(
    `
      *[_type == "singletonPage" && pageKey == $pageKey][0]{
        jsonData
      }
    `,
    { pageKey }
  );

  if (!doc?.jsonData) return null;

  try {
    return JSON.parse(doc.jsonData) as T;
  } catch {
    return null;
  }
}
