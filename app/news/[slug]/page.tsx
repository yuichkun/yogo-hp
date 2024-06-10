import { getNewsBySlug, getWorkBySlug } from "../../lib/api";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { SHARED_METADATA } from "@/app/shared-metadata";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Page({ params, searchParams }: Props) {
  const {
    fields: { title, detail, date },
  } = await getNewsBySlug(params.slug);
  return (
    <main className="mx-auto p-8 max-w-[960px] border-2">
      <h1 className="text-2xl mb-8">{title}</h1>
      {documentToReactComponents(detail, {
        renderNode: {
          [INLINES.HYPERLINK]: (node, children) => {
            if (node.data.uri.includes("<iframe")) {
              return (
                <span
                  dangerouslySetInnerHTML={{
                    __html: node.data.uri,
                  }}
                />
              );
            }
            return (
              <a
                href={node.data.uri}
                target="__blank"
                className="text-blue-500"
              >
                {children}
              </a>
            );
          },
          [BLOCKS.PARAGRAPH]: (node, children) => {
            if (
              node.content.length === 1 &&
              (node.content[0] as any).value === ""
            ) {
              return <br />;
            }
            return <p>{children}</p>;
          },
        },
        preserveWhitespace: true,
      })}
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    fields: { title },
  } = await getNewsBySlug(params.slug);
  return {
    title: "News",
    description: title,
    twitter: {
      title: `YOGO HP | News`,
      description: title,
    },
  };
}
