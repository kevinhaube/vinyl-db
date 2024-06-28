import { TypedLegacyEntry } from '@/data/legacy/types';
import Image from 'next/image';
import Pill from '@/components/atom/Pill';

const AlbumCover = ({ album }: { album: TypedLegacyEntry }) => {
  const infoPosition = "absolute bottom-0 left-0 w-full"
  const infoInteraction = "group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100"
  const infoStyle = "h-full w-full flex flex-col gap-2 bg-black bg-opacity-50 text-white text-center p-4 flex justify-center items-center opacity-0 transition-opacity"
  return (
    <div className="relative w-full h-full group">
      <Image src={album.Artwork} alt={album.Title} height={999} width={999} className="aspect-square object-cover" />
      <div className={`${infoPosition} ${infoInteraction} ${infoStyle}`}>
        <Pill text={album.Artist} />
        <span className="text-sm font-semibold">{album.Title}</span>
      </div>
    </div>
  )
}

export default AlbumCover