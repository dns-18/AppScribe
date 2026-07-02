import React from 'react'

function Logo({ width = '100px', className = '' }) {
  return (
    <svg
      width={width}
      viewBox="0 0 260 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="2" y="2" width="52" height="52" rx="16" fill="url(#logoGradient)" />
      <defs>
        <linearGradient id="logoGradient" x1="2" y1="2" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <path d="M15 36L26 12L37 36H15Z" fill="#F8FAFC" />
      <path d="M26 22L39 36H26V22Z" fill="#C7D2FE" />
      <text x="68" y="36" fontFamily="Inter, Arial, sans-serif" fontSize="24" fontWeight="700" fill="currentColor" className="text-slate-900 dark:text-slate-50">
        App
        <tspan fontWeight="500" fill="#4F46E5">Scribe</tspan>
      </text>
    </svg>
  )
}

export default Logo