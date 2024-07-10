import { redirect } from 'next/navigation';
import { createSupabaseClient } from '@/utils/supabase/createSupabaseClient';

export async function signInWithGithub() {
  "use server"
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.APP_URL}` // no scheme needed (i.e. https://)
    }
  })
  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  "use server"
  const supabase = createSupabaseClient();
  const { error } = await supabase.auth.signOut()
  if (!error) {
    redirect(`https://${process.env.APP_URL}`)
  } else {
    console.log(error)
  }
}
