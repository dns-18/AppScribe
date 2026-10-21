// import React from 'react'
// import { Link } from 'react-router-dom'
// import Logo from '../Logo'

// function Footer() {
//   return (
//     <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
//             <div className="relative z-10 mx-auto max-w-7xl px-4">
//                 <div className="-m-6 flex flex-wrap">
//                     <div className="w-full p-6 md:w-1/2 lg:w-5/12">
//                         <div className="flex h-full flex-col justify-between">
//                             <div className="mb-4 inline-flex items-center">
//                                 <Logo width="100px" />
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-600">
//                                     &copy; Copyright 2023. All Rights Reserved by DevUI.
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Company
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Features
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Pricing
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Affiliate Program
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Press Kit
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Support
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Account
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Help
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Contact Us
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Customer Support
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     <div className="w-full p-6 md:w-1/2 lg:w-3/12">
//                         <div className="h-full">
//                             <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
//                                 Legals
//                             </h3>
//                             <ul>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Terms &amp; Conditions
//                                     </Link>
//                                 </li>
//                                 <li className="mb-4">
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Privacy Policy
//                                     </Link>
//                                 </li>
//                                 <li>
//                                     <Link
//                                         className=" text-base font-medium text-gray-900 hover:text-gray-700"
//                                         to="/"
//                                     >
//                                         Licensing
//                                     </Link>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// }

// export default Footer

import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ width = "100px" }) {
  return (
    <svg
      width={width}
      viewBox="0 0 240 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="4,40 22,4 40,40 22,28" fill="#1a1a2e" />
      <polygon points="22,28 40,40 22,36" fill="#6C8EF5" />
      <line
        x1="22"
        y1="36"
        x2="22"
        y2="44"
        stroke="#6C8EF5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <text
        x="52"
        y="33"
        fontFamily="-apple-system, sans-serif"
        fontSize="21"
        fontWeight="600"
        fill="#1a1a2e"
      >
        App
        <tspan fontWeight="400" fill="#6C8EF5">
          Scribe
        </tspan>
      </text>
    </svg>
  )
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-white/70 bg-white/80 px-6 py-12 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75 animate-fade-up">
      <div className="max-w-5xl mx-auto">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-4 animate-scale-in">
            <Logo width="130px" />

            <p className="max-w-[240px] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A cleaner publishing experience for writing, reviewing, and managing content.
            </p>

            <p className="text-xs text-slate-400 dark:text-slate-500">
              &copy; 2026 AppScribe. All rights reserved.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              Explore
            </h4>

            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "All Posts", to: "/all-posts" },
                { label: "Add Post", to: "/add-post" },
                { label: "Sign in", to: "/login" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-slate-500 transition-all duration-150 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover-lift"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <h4 className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
              Project
            </h4>

            <ul className="flex flex-col gap-2.5">
              {[
                { label: "GitHub repository", href: "https://github.com/dns-18/AppScribe" },
                { label: "GitHub profile", href: "https://github.com/dns-18" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-slate-500 transition-all duration-150 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white hover-lift"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row dark:border-slate-800">

          <p className="text-xs text-slate-400 dark:text-slate-500">
            Built with React and Appwrite.
          </p>

          <div className="flex items-center gap-5">

            {/* GitHub */}
            <a
              href="https://github.com/dns-18"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-slate-400 transition-colors duration-150 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer