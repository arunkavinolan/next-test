import React from 'react';
import '../app/globals.css' ;

export default function Main() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
                                      {/* Sidenavigation bar design */}
      <aside className="w-72 bg-gray-800 border-r border-gray-700 p-4 flex flex-col">
        <div className="mb-4">
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md">New Chat</button>
        </div>

        <nav className="flex-1 overflow-auto space-y-2">
          <div className="px-2 py-2 rounded-md bg-gray-800/50">History</div>
          <div className="px-2 py-2 rounded-md hover:bg-gray-800/30"> React Chat </div>
          <div className="px-2 py-2 rounded-md hover:bg-gray-800/30"> Heart Affect </div>
          <div className="px-2 py-2 rounded-md hover:bg-gray-800/30"> Next.js Chat </div>
           <div className="px-2 py-2 rounded-md hover:bg-gray-800/30"> Lung Affect </div>
        </nav>

        <div className="mt-4">
          <button className="w-full bg-transparent border border-gray-700 py-2 rounded-md"> Logout </button>
        </div>
      </aside>

                                    {/* Main area Design */}
      <main className="flex-1 p-10 flex flex-col items-center justify-start">
        <div className="w-full max-w-4xl">
          <header className="text-center mb-10">
            <h1 className="text-3xl font-semibold"> Hi Arunkavi! Good Morning <span aria-hidden> 🌤️ </span></h1>
          </header>

                                    {/* Suggestions / quick chips  Design*/}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <button className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-full hover:bg-gray-800/40"> What is Tuberclosis? </button>
            <button className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-full hover:bg-gray-800/40"> What are the symptoms of lung disease? </button>
            <button className="px-4 py-2 bg-gray-800/60 border border-gray-700 rounded-full hover:bg-gray-800/40"> What are the diseases related to Brain? </button>
          </div>

          {/* Search box */}
          <div className="flex items-center gap-3 justify-center">
            <div className="flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-3 py-2 w-3/4">
              <div className="flex items-center gap-2 mr-4">
                <span className="text-sm px-3 py-1 border border-gray-700 rounded-full"> Model 1 </span>
                <span className="text-sm px-3 py-1 border border-gray-700 rounded-full"> Deep Search </span>
              </div>

              <input
                className="flex-1 bg-transparent outline-none text-gray-100 placeholder-gray-400"placeholder="Ask Here..."
                aria-label="chat input"
              />

              <button className="ml-3 bg-blue-600 hover:bg-blue-500 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {/* <path d="M2.94 2.94a1.5 1.5 0 012.12 0L17 14.88V17h-2.12L2.94 5.06a1.5 1.5 0 010-2.12z" /> */}
                </svg>
              </button>
            </div>
          </div>

                               {/* Mock chat area (centered empty state) */}
          <div className="mt-12 bg-gradient-to-b from-transparent to-gray-900/40 rounded-xl py-16 flex items-center justify-center">
            <div className="text-center text-gray-300 max-w-xl">
              <p className="mb-4 text-lg"> Welcome — ask anything or choose a suggestion above </p>

              <div className="flex gap-3 justify-center">
                <button className="px-4 py-2 bg-gray-800/40 border border-gray-700 rounded-md"> Examples </button>
                <button className="px-4 py-2 bg-gray-800/40 border border-gray-700 rounded-md"> Docs </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
