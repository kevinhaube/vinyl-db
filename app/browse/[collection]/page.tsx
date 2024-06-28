import AlbumGrid from '@/components/AlbumGrid';
import { transformLegacyTypes } from '@/data/legacy/transforms';
import { useSupabase } from '@/utils/supabase/useSupabase';
import { LegacySortType, sortLegacyEntries } from '@/data/legacy/filters';
import { TypedLegacyEntry } from '@/data/legacy/types';

export default async function Page({ params }: { params: { collection: LegacySortType } }) {
  const sb = useSupabase()
  const { data } = await sb.from("legacy-notion").select('*')
  const sortedAlbums = sortLegacyEntries(transformLegacyTypes(...data), params.collection)

  return (
    <main className="flex min-h-screen flex-col items-start my-8 mx-2 lg:mx-6">
      {<AlbumGrid albums={(sortedAlbums as TypedLegacyEntry[])} />}
    </main>
  );
}