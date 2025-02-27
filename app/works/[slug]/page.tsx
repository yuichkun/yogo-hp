import { getWorkBySlug } from "../../lib/api";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { FilePreview } from "@/app/components/FilePreview";
import { Metadata } from "next";
import { SHARED_METADATA } from "@/app/shared-metadata";

export const dynamic = "force-dynamic";
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Page({ params, searchParams }: Props) {
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
                <a
                  href={node.data.uri}
                  target="__blank"
                  className="break-words"
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
                <div key={file.sys.id}>
                  <FilePreview
                    url={file.fields.file.url}
                    title={file.fields.title ?? "ファイル名不明"}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const {
    fields: { title, thumbnail },
  } = await getWorkBySlug(params.slug);
  let thumbnailUrl = "";
  if (thumbnail?.fields.file) {
    thumbnailUrl = `https:${thumbnail.fields.file.url}?w=1200&h=630&fit=fill&f=center&fm=jpg`;
  }
  return {
    title,
    openGraph: {
      ...SHARED_METADATA.openGraph,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      title,
    },
  };
}
