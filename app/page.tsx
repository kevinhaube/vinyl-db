import AlbumGrid from "@/components/AlbumGrid/AlbumGrid";
import {transformLegacyTypes} from "@/data/legacy/transforms";
import {sortRecentlyAdded} from "@/data/legacy/filters";
import { useSupabase } from '@/utils/supabase/useSupabase';

export default async function Home() {
  const supabase = useSupabase()
  const { data } = await supabase.from("legacy-notion").select('*')

  return (
    <main className="flex min-h-screen flex-col items-start mt-20 ml-2 mr-2">
      <h2 className={'text-xl'}>recently added</h2>
      <AlbumGrid albums={sortRecentlyAdded(transformLegacyTypes(...data))} />
    </main>
  );
}
