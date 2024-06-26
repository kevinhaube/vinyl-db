import {LegacyEntry, TypedLegacyEntry} from "@/data/legacy/types";

export function transformLegacyTypes(...args: LegacyEntry[]): TypedLegacyEntry[] {
    return args.map((entry) => ({
        ...entry,
        Acquired: entry?.Acquired ? new Date(entry.Acquired) : null,
        Purchased: entry?.Purchased ? new Date(entry.Purchased) : null,
        Genre: entry?.Genre?.length ? entry.Genre.split(", ") : [], // to string[]
        Vibes: entry?.Vibes?.length ? entry.Vibes.split(", ") : [], // to string[]
        Preorder: entry?.Preorder === "Yes" // to boolean
    }))
}
