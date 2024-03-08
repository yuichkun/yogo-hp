import { TypeWorksSkeleton } from "@/@types/generated";
import * as contentful from "contentful";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getWorks = async () => {
  return await client.withoutUnresolvableLinks.getEntries<TypeWorksSkeleton>();
};

export const getWorkBySlug = async (slug: string) => {
  const { items } = await client.getEntries<TypeWorksSkeleton>({
    content_type: "works",
    "fields.slug": slug,
  });

  if (items.length === 0) {
    throw new Error(`No work found with the slug "${slug}"`);
  }
  return items[0];
};
