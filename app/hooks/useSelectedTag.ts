import { usePathname, useSearchParams } from "next/navigation";

export const useSelectedTag = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const selectedTagId = searchParams.get("tag");
  return selectedTagId;
};
