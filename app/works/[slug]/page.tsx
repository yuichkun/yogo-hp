import { getWorkBySlug } from "../../lib/api";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    fields: { title, year, description },
  } = await getWorkBySlug(params.slug);
  return (
    <main className="">
      <h1>
        {title} ({year})
      </h1>
    </main>
  );
}
