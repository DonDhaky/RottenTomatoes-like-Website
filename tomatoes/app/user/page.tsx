"use client";

import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Page protégée pour tester la connexion</h1>
      <p>Bienvenue, {session?.user?.name}!</p>
      <button onClick={() => signOut()}>Déconnexion</button>
    </div>
  );
};

export default ProtectedPage;