import React from 'react';
import { signInWithGithub, signOut } from '@/utils/supabase/auth';

export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col items-start my-8 mx-2 lg:mx-6">
      <form action={signInWithGithub}>
        <button type="submit">Sign In with GitHub</button>
      </form>

      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </main>
  );
}