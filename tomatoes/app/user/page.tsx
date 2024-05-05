"use client";
import 'tailwindcss/tailwind.css';
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AccountManagementPage = () => {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const handleUpdate = async () => {
    if (password !== confirmPassword) {
      alert("Password don't match each other.");
      return;
    }

    const userId = session.user.id; // "session" n'est pas nul grâce au hook UseSession
    console.log("user Id = ", userId);

    const response = await fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      const response = await fetch("/api/delete-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        signOut();
        router.replace("/");
      } else {
        alert(
          "Error while trying to delete your account, please try again later."
        );
      }
    }
  };

  // const ProtectedPage = () => {
  //   const { data: session, status } = useSession();
  //   const router = useRouter();
  // console.log(session);

  if (status === "loading") {
    return <div>Chargement...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome {session?.user?.email}</h1>
      <h2 className="text-xl font-semibold mb-6">Manage your account here</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">
            Set a new e-mail :
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Type your password or set a new one :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Confirm password :
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
      </div>

      <div className="mt-8">
        <label className="block font-medium mb-1">
          Delete your account :{" "}
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </label>
      </div>

      <div className="mt-8">
        <label className="block font-medium mb-1">
          Go back to homepage :{" "}
          <Link href="/" passHref>
            <h1 className="text-blue-500 font-semibold underline">Accueil</h1>
          </Link>
        </label>
      </div>

      <div className="mt-8">
        <button
          onClick={() => signOut()}
          className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-gray-600"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default AccountManagementPage;
