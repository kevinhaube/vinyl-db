import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export function useSupabase() {
  const cookieStore = cookies()
  return createClient(cookieStore)
}