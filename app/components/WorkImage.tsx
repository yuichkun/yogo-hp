import Image from "next/image";

type Props = {
  title: string;
  url: string;
};

export function WorkImage({ title, url }: Props) {
  return (
    <div className="w-full h-full relative">
      <Image src={url} alt={title} className="h-full object-cover" fill />
    </div>
  );
}
