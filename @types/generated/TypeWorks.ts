import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeWorksFields {
    title: EntryFieldTypes.Symbol;
    thumbnail: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.RichText;
    year: EntryFieldTypes.Integer;
    slug: EntryFieldTypes.Symbol;
}

export type TypeWorksSkeleton = EntrySkeletonType<TypeWorksFields, "works">;
export type TypeWorks<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeWorksSkeleton, Modifiers, Locales>;
