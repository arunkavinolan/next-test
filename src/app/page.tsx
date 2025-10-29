'use client'
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!token.trim()) {
      alert("Please enter a token to Login!");
      return;
    } 
    setIsLoading(true);
   
    // simulate-API-call-delay(real-auth)
    setTimeout(() => {
      localStorage.setItem('authToken', token);
      router.replace('/chat');
      console.log("Logged in with token:", token);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setToken(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <form onSubmit={handleLogin} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-blue-500/20 w-full max-w-sm mx-4 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            Login With Token
          </h2>
          <p className="text-gray-400 text-sm">Enter your access token to continue.</p>
        </div>

        <div>
          <label htmlFor="token" className="sr-only">Token</label>
          <input 
            id="token"
            name="input-token"
            type="text" 
            placeholder="Enter Token Here" 
            value={token} 
            onChange={handleInputChange}
            aria-label="Enter your token"
            className="w-full p-3 rounded-lg bg-gray-700/80 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
          />
        </div>

        <button 
          type="submit"
          id='login-button'
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Logging in...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button> 
      </form>
    </div>
  )
}