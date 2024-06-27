import {TypedLegacyEntry} from "@/data/legacy/types";
import { groupAndSortByProperty } from '@/utils/groupAndSortByProperty';

export const SORTED_PAGES = ["recently-added", "artists"] as const
export type LegacySortType = typeof SORTED_PAGES[number]

export function sortRecentlyAdded(args: TypedLegacyEntry[]) {
    return args
        .filter((arg) => arg.Acquired !== null)
        .sort((a, b) =>
            (b.Acquired as Date).getTime() - (a.Acquired as Date).getTime()
        )
        .slice(0,12)
}

export function sortArtists(args: TypedLegacyEntry[]) {
    return groupAndSortByProperty<TypedLegacyEntry>(args, "Artist", "Title");
}

export function sortLegacyEntries(args: TypedLegacyEntry[], sort: LegacySortType) {
    switch (sort) {
        case "recently-added":
            return sortRecentlyAdded(args)
        case "artists":
            return sortArtists(args)
        default:
            // runtime invalid 'sort' type failure
            console.error(`sortLegacyEntries: invalid sort type ${sort} - data was returned unsorted`)
            return args // no sort
    }
}