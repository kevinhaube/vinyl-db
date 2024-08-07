import React from 'react';
import AlbumGrid from '@/components/AlbumGrid';
import { createSupabaseClient } from '@/utils/supabase/createSupabaseClient';
import { SortType, sortLegacyEntries } from '@/data/filters';
import { getFullList } from '@/utils/supabase/queries';
import { FullAlbumDetails } from '@/data/types';

export default async function Page({ params }: { params: { collection: SortType['slug'] } }) {
  const sb = createSupabaseClient()
  const data = await getFullList(sb);
  const sortedAlbums = sortLegacyEntries(data, params.collection)

  return (
    <main className="flex min-h-screen flex-col items-start my-8 mx-2 lg:mx-6">
      {<AlbumGrid albums={(sortedAlbums as FullAlbumDetails[])} />}
    </main>
  );
}