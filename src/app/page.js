'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!token.trim()) {
      alert("Please enter a token to Login!");
      return;
    }
    router.replace('/chat');
    console.log("Login in with token:", token);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleLogin}
       className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm mx-4">

        <h2 className="text-center text-white text-xl font-semibold mb-6">
          Login With Token
        </h2>

        <input type="text" placeholder="Enter Token Here" value={token} onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
        />

        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors">
              Login
        </button>
      </form>
    </div>
  )
}

