import { TypedLegacyEntry } from "@/data/legacy/types";
import AlbumCover from '@/components/AlbumCover';

const AlbumGrid = ({ albums }: { albums: TypedLegacyEntry[] }) => {
    return (
      <div className="w-[96.5vw] grid grid-cols-2 md:grid-cols-4 gap-2">
          {albums?.length > 0 ? (
            albums.map((album, index) => (
              <div key={index} className="col-span-1 aspect-square bg-gray-200 flex justify-center items-center">
                <AlbumCover album={album} />
              </div>
                ))
            ) : <em className={"text-gray-500"}>No data</em>}
        </div>
    );
};

export default AlbumGrid;