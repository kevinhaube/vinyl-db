import {TypedLegacyEntry} from "@/data/legacy/types";
import { groupAndSortByProperty } from '@/utils/groupAndSortByProperty';

export const SORTED_PAGES = ["newest", "artist(a-z)", "preorders"] as const
export type LegacySortType = typeof SORTED_PAGES[number]

const isAcquired = (arg: TypedLegacyEntry) => arg.Acquired
const isPreorder = (arg: TypedLegacyEntry) => arg.Preorder
const sortByTime = (aDate: Date, bDate: Date) => bDate.getTime() - aDate.getTime()

function sortRecentlyAdded(args: TypedLegacyEntry[]) {
    return args
        .filter((arg) => isAcquired(arg))
        .sort((a, b) => sortByTime((a.Acquired as Date), (b.Acquired as Date)))
}

function sortArtists(args: TypedLegacyEntry[]) {
    return groupAndSortByProperty<TypedLegacyEntry>(args, "Artist", "Title").flat();
}

function filterPreorders(args: TypedLegacyEntry[]) {
    return args.filter((arg) => isPreorder(arg) && !isAcquired(arg))
}

function filterShipping(args: TypedLegacyEntry[]) {
    return args.filter((arg) => !isPreorder(arg) && !isAcquired(arg))
}

export function sortLegacyEntries(args: TypedLegacyEntry[], sort: LegacySortType) {
    switch (sort) {
        case "newest":
            return sortRecentlyAdded(args)
        case "artist(a-z)":
            return sortArtists(args)
        case "preorders":
            return filterPreorders(args)
        default:
            // runtime invalid 'sort' type failure
            console.error(`sortLegacyEntries: invalid sort type ${sort} - data was returned unsorted`)
            return args // no sort
    }
}