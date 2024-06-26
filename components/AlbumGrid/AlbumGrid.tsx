import {LegacyEntry, TypedLegacyEntry} from "@/data/legacy/types";
import {sortRecentlyAdded} from "@/data/legacy/filters";

const AlbumGrid = ({ albums }: { albums: TypedLegacyEntry[] }) => {
    return (
        <div className="my-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {albums?.length > 0 ? (
                albums.map((album, index) => (
                    <div key={index} className="aspect-square bg-gray-200 flex justify-center items-center">
                        <img src={"/"} alt={album.Title} className="object-cover" />
                    </div>
                ))
            ) : <em className={"text-gray-500"}>No data</em>}
        </div>
    );
};

export default AlbumGrid;