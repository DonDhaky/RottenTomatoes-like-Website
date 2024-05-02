"use client";
// A MODIFIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEER
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetch("/api/auth/register", { // ATTENTION A LA ROUTE
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      router.push("/auth/signin"); // REVOIR REDIRECTION ??
    } else {
      const error = await response.json();
      alert(error.error);
    }
  };

  return (
    <div>
      <h1>Login on the site</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br></br><br></br>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br></br><br></br>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br></br>
      <button onClick={handleRegister}>Login</button>
    </div>
  );
};

export default Login;