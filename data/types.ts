interface SupabaseDbEntry {
  id: number;
  created_at: string;
}

export interface Album extends SupabaseDbEntry {
  title: string;
  artist_id: number;
  purchase_date: string;
  acquired_date: string;
  release_year: number;
  variant: string;
  preordered: boolean;
  artwork_url: string;
}

export type FullAlbumDetails = Album & { artist_name: string; }

export interface Artist extends SupabaseDbEntry { name: string }
export interface Vibe extends SupabaseDbEntry { label: string, type: "genre" | "vibe" }
