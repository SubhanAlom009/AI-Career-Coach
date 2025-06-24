import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white font-sans">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="mb-6">
        <circle cx="12" cy="12" r="10" fill="#fff2" />
        <path d="M9 9h.01M15 9h.01M8 15c1.333-1 4.667-1 6 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <h1 className="text-6xl font-bold m-0">404</h1>
      <h2 className="font-normal mt-2 mb-6 text-2xl">Page Not Found</h2>
      <p className="max-w-md text-center mb-8">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-semibold shadow hover:bg-slate-100 transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
