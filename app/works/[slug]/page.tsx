import { getWorkBySlug } from "../../lib/api";
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FilePreview } from "@/app/components/FilePreview";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    fields: { title, year, description, files },
  } = await getWorkBySlug(params.slug);

  return (
    <main className="mx-auto p-8 max-w-[960px]">
      <h1 className="text-2xl mb-8 text-center">
        {title} ({year})
      </h1>
      <div>
        {documentToReactComponents(description, {
          renderNode: {
            [INLINES.HYPERLINK]: (node, children) => {
              if (node.data.uri.includes("<iframe")) {
                return (
                  <span
                    className="my-8 block aspect-video"
                    dangerouslySetInnerHTML={{
                      __html: node.data.uri,
                    }}
                  />
                );
              }
              return (
                <a href={node.data.uri} target="__blank">
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
              return <p className="mb-4">{children}</p>;
            },
          },
          preserveWhitespace: true,
        })}
      </div>
      <div className="mt-16">
        {files && files.length > 0 && (
          <>
            <div className="mb-2 font-bold">添付ファイル&gt;</div>
            {files.map((file) => {
              if (!file?.fields.file) return null;
              return (
                <FilePreview
                  key={file.sys.id}
                  url={file.fields.file.url}
                  title={file.fields.title ?? "ファイル名不明"}
                />
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}
