import {TypedLegacyEntry} from "@/data/legacy/types";
import { groupAndSortByProperty } from '@/utils/groupAndSortByProperty';

export const SORTED_PAGES = ["newest", "artist(a-z)"] as const
export type LegacySortType = typeof SORTED_PAGES[number]

export function sortRecentlyAdded(args: TypedLegacyEntry[]) {
    return args
        .filter((arg) => arg.Acquired !== null)
        .sort((a, b) =>
            (b.Acquired as Date).getTime() - (a.Acquired as Date).getTime()
        )
}

export function sortArtists(args: TypedLegacyEntry[]) {
    return groupAndSortByProperty<TypedLegacyEntry>(args, "Artist", "Title");
}

function sortArtistsV2(args: TypedLegacyEntry[]) {
    return args.sort((a, b) => String(a.Artist).localeCompare(String(b.Artist)))
}

export function sortLegacyEntries(args: TypedLegacyEntry[], sort: LegacySortType) {
    switch (sort) {
        case "newest":
            return sortRecentlyAdded(args)
        case "artist(a-z)":
            return sortArtistsV2(args)
        default:
            // runtime invalid 'sort' type failure
            console.error(`sortLegacyEntries: invalid sort type ${sort} - data was returned unsorted`)
            return args // no sort
    }
}