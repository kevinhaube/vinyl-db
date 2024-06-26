export type LegacyCols = "Title"
    | "Artist"
    | "Acquired"
    | "Genre"
    | "Vibes"
    | "Variant"
    | "Purchased"
    | "Retailer"
    | "Preorder";

export type LegacyEntry = {[key in LegacyCols]: string}

type LegacySafeCols = Pick<LegacyEntry, "Title" | "Artist" | "Variant" | "Retailer">
export type TypedLegacyEntry =  & LegacySafeCols & {
    Acquired: Date | null; // use with `new Date()`
    Purchased: Date | null; // use with `new Date()`
    Genre: string[];
    Vibes: string[];
    Preorder: boolean;
}
