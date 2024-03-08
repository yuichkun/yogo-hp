import { TypeWorksSkeleton } from "@/@types/generated";
import contentful from "contentful";

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export const getWorks = async () => {
  return await client.getEntries<TypeWorksSkeleton>();
};
