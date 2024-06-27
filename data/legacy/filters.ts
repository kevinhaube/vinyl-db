import {TypedLegacyEntry} from "@/data/legacy/types";
import { groupAndSortByProperty } from '@/utils/groupAndSortByProperty';

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