import { groupAndSortByProperty } from '@/utils/groupAndSortByProperty';
import { FullAlbumDetails } from '@/data/types';

export const SORTED_PAGES = ["newest", "artist(a-z)", "preorders"] as const
export type SortType = typeof SORTED_PAGES[number]

const isAcquired = (arg: FullAlbumDetails) => arg.acquired_date
const isPreorder = (arg: FullAlbumDetails) => arg.preordered
const sortByTime = (aDate: Date, bDate: Date) => bDate.getTime() - aDate.getTime()

function sortRecentlyAdded(args: FullAlbumDetails[]) {
    return args
        .filter((arg) => isAcquired(arg))
        .sort((a, b) => sortByTime(new Date(a.acquired_date), new Date(b.acquired_date)))
}

function sortArtists(args: FullAlbumDetails[]) {
    return groupAndSortByProperty<FullAlbumDetails>(args, "artist_name", "title").flat();
}

function filterPreorders(args: FullAlbumDetails[]) {
    return args.filter((arg) => isPreorder(arg) && !isAcquired(arg))
}

export function sortLegacyEntries(args: FullAlbumDetails[], sort: SortType) {
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