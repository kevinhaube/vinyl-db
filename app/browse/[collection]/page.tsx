import AlbumGrid from '@/components/AlbumGrid/AlbumGrid';
import { transformLegacyTypes } from '@/data/legacy/transforms';
import { useSupabase } from '@/utils/supabase/useSupabase';
import { LegacySortType, sortLegacyEntries } from '@/data/legacy/filters';
import { TypedLegacyEntry } from '@/data/legacy/types';

export default async function Page({ params }: { params: { collection: LegacySortType } }) {
  const sb = useSupabase()
  const { data } = await sb.from("legacy-notion").select('*')
  const sortedAlbums = sortLegacyEntries(transformLegacyTypes(...data), params.collection)

  return (
    <main className="flex min-h-screen flex-col items-start my-20 mx-2 lg:mx-6">
      <h2 className={'text-xl'}>{params.collection}</h2>
      {Array.isArray(sortedAlbums[0])
        ? sortedAlbums.map((c, idx) => (
          // Grouped Rendering
          <section key={`section-${idx}`} className={"my-4"}>
            <h3>{(c as TypedLegacyEntry[])[0].Artist}</h3>
            <AlbumGrid albums={(c as TypedLegacyEntry[])} />
          </section>
        ))
        : <AlbumGrid albums={(sortedAlbums as TypedLegacyEntry[])} />
      }
    </main>
  );
}