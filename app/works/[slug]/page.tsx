import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
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
  console.log(JSON.stringify(description, null, 2));
  return (
    <main className="p-8">
      <h1>
        {title} ({year})
      </h1>
      {documentToReactComponents(description, {
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
