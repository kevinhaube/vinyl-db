import Image from "next/image";
import AlbumGrid from "@/components/AlbumGrid/AlbumGrid";
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {transformLegacyTypes} from "@/data/legacy/transforms";
import {LegacyEntry} from "@/data/legacy/types";
import {sortRecentlyAdded} from "@/data/legacy/filters";
export default async function Home() {

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data } = await supabase.from("legacy-notion").select('*')

  return (
    <main className="flex min-h-screen flex-col items-start mt-20 ml-2 mr-2">
      <h2 className={"text-xl"}>recently added</h2>
        <AlbumGrid albums={sortRecentlyAdded(transformLegacyTypes(...data))} />
    </main>
  );
}
