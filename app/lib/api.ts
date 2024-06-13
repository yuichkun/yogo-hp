import { TypeNewsSkeleton, TypeWorksSkeleton } from "@/@types/generated";
import * as contentful from "contentful";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getWorks = async () => {
  return await client.withoutUnresolvableLinks.getEntries<TypeWorksSkeleton>({
    content_type: "works",
    order: ["-fields.year"],
  });
};

export const getWorkBySlug = async (slug: string) => {
  const { items } =
    await client.withoutUnresolvableLinks.getEntries<TypeWorksSkeleton>({
      content_type: "works",
      "fields.slug": slug,
    });

  if (items.length === 0) {
    throw new Error(`No work found with the slug "${slug}"`);
  }
  return items[0];
};

export const getNews = async () => {
  return await client.getEntries<TypeNewsSkeleton>({
    content_type: "news",
    order: ["-fields.date"],
  });
};

export const getNewsBySlug = async (slug: string) => {
  const { items } = await client.getEntries<TypeNewsSkeleton>({
    content_type: "news",
    "fields.slug": slug,
  });

  if (items.length === 0) {
    throw new Error(`No news found with the slug "${slug}"`);
  }
  return items[0];
};

export const getAllTags = async () => {
  const { items } = await client.getTags();
  return items;
};
