import {TypedLegacyEntry} from "@/data/legacy/types";

export function sortRecentlyAdded(args: TypedLegacyEntry[]) {
    return args
        .filter((arg) => arg.Acquired !== null)
        .sort((a, b) =>
            (b.Acquired as Date).getTime() - (a.Acquired as Date).getTime()
        )
        .slice(0,12)
}