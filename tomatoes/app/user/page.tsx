"use client";

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const AccountManagementPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(session?.user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

const handleUpdate = async () => {
  if (password !== confirmPassword) {
    alert("Password don't match each other.");
    return;
  }

const userId = session.user.id; // "session" n'est pas nul grâce au hook UseSession
console.log('user Id = ', userId);

const response = await fetch('/api/update-user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password, userId }),
});

if (response.ok) {
  alert("Your account has been edited successfully !");
} else {
  alert("Error. Please try again later.");
}
};

const handleDeleteAccount = async () => {
  if (confirm("Are you sure you want to delete your account ?")) {
    const response = await fetch('/api/delete-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (response.ok) {
      signOut();
      router.replace('/');
    } else {
      alert("Error while trying to delete your account, please try again later.");
    }
  }
};
    
// const ProtectedPage = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();
// console.log(session);

  if (status === 'loading') {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Welcolme {session?.user?.email}</h1>
      <h2>Manage your account here</h2><br></br>
      <div>
        <label>
          Set a new e-mail : 
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Type your password or set a new one :
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} required
          />
        </label>
      </div>
      <div>
        <label>
           Confirm password :
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} required
          />
        </label>
      </div>
      <button onClick={handleUpdate}>Edit</button><br></br><br></br><br></br>
      
      <label>Delete your account : <button onClick={handleDeleteAccount}>Delete</button></label><br /><br />

      <label>Go back to homepage : <Link href="/" passHref>Accueil</Link></label><br /><br />
      <button onClick={() => signOut()}>Déconnexion</button>
    </div>
  );
};

export default AccountManagementPage;