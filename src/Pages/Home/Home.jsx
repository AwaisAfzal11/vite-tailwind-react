import React from 'react'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Home</h1>
      <div className="space-x-4"></div>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          onClick={() => window.location.href = '/about'}
        >
          About
        </button>
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
          onClick={() => window.location.href = './projects'}
        >
          Projects
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
        >
          Contact
        </button>
      </div>
  )
}

export default Home