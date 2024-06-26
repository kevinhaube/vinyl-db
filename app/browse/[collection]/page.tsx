import AlbumGrid from '@/components/AlbumGrid/AlbumGrid';
import { transformLegacyTypes } from '@/data/legacy/transforms';
import { useSupabase } from '@/utils/supabase/useSupabase';
import { sortRecentlyAdded } from '@/data/legacy/filters';
import { TypedLegacyEntry } from '@/data/legacy/types';

export default async function Page({ params }: { params: { collection: string } }) {
  const supabase = useSupabase()
  const { data } = await supabase.from("legacy-notion").select('*')
  const filterAlbums = (albums: TypedLegacyEntry[]) => {
    switch (params.collection) {
      case "recently-added":
        return sortRecentlyAdded(albums)
      default:
        return albums
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-start mt-20 ml-2 mr-2">
      <h2 className={'text-xl'}>{params.collection}</h2>
      <AlbumGrid albums={filterAlbums(transformLegacyTypes(...data))} />
    </main>
  );
}