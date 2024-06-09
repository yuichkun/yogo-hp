import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface TypeNewsFields {
  date: EntryFieldTypes.Date;
  detail: EntryFieldTypes.RichText;
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
}

export type TypeNewsSkeleton = EntrySkeletonType<TypeNewsFields, "news">;
export type TypeNews<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode,
> = Entry<TypeNewsSkeleton, Modifiers, Locales>;
