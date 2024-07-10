import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export function createSupabaseClient() {
  const cookieStore = cookies()
  return createClient(cookieStore)
}