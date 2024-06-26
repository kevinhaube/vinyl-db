import AlbumGrid from '@/components/AlbumGrid/AlbumGrid';
import { transformLegacyTypes } from '@/data/legacy/transforms';
import { useSupabase } from '@/utils/supabase/useSupabase';
import { sortArtists, sortRecentlyAdded } from '@/data/legacy/filters';
import { TypedLegacyEntry } from '@/data/legacy/types';

export default async function Page({ params }: { params: { collection: string } }) {
  const sb = useSupabase()
  const { data } = await sb.from("legacy-notion").select('*')
  const filterAlbums = (albums: TypedLegacyEntry[]) => {
    switch (params.collection) {
      case "recently-added":
        return sortRecentlyAdded(albums)
      case "artists":
        return sortArtists(albums) // TODO
      default:
        return albums
    }
  }
  const renderArr = filterAlbums(transformLegacyTypes(...data))

  return (
    <main className="flex min-h-screen flex-col items-start my-20 mx-2 lg:mx-6">
      <h2 className={'text-xl'}>{params.collection}</h2>
      {Array.isArray(renderArr[0])
        ? renderArr.map((c, idx) => (
          // Grouped Rendering
          <section key={`section-${idx}`} className={"my-4"}>
            <h3>{(c as TypedLegacyEntry[])[0].Artist}</h3>
            <AlbumGrid albums={(c as TypedLegacyEntry[])} />
          </section>
        ))
        : <AlbumGrid albums={(renderArr as TypedLegacyEntry[])} />
      }
    </main>
  );
}