import { SupabaseClient } from '@supabase/supabase-js';
import { Album, Artist, FullAlbumDetails } from '@/data/types';

export const getFullList = async (client: SupabaseClient): Promise<FullAlbumDetails[]> => {
  const { data: artists, error: artistError } = await client.from('artist').select('*');
  const { data: albums, error: albumError } = await client.from('album').select('*');
  if (!artists?.length || !albums?.length) {
    console.error("data missing error\n", "artists: ", artists, "\nalbums: ", albums)
  } else if (artistError || albumError) {
    console.error("supabase qeury error\n", "artist: ", artistError, "\nalbum: ", albumError)
  }
  // Create a map of artist_id to artist details for easy lookup
  const artistMap = artists.reduce((acc: Record<number, any>, artist: Artist) => {
    acc[artist.id] = artist.name
    return acc
  }, {})
  return albums?.map((album: Album) => ({
    ...album,
    artist_name: artistMap[album.artist_id]
  }))
}