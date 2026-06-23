"use client";

import Link from "next/link";
import { useContext } from "react";
import { Search, CirclePlus } from "lucide-react";
import { PostContext } from "../../context/PostContext";

export default function NavBar() {
  const { inputSearchTitle, setInputSearchTitle } = useContext(PostContext);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-xl">
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex shrink-0 items-center gap-3 rounded-full px-1.5 py-1"
        >
          <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-cyan-100 bg-white shadow-sm ring-4 shadow-cyan-100 ring-cyan-50">
            <img
              src="/cool-shrimp-logo-flat-vector-design_670330-1648.jpg"
              alt="Shrimp logo"
              className="h-full w-full object-contain p-1 mix-blend-multiply"
            />
          </span>
          <span className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
            Shrimp
          </span>
        </a>

        <div className="pointer-events-none absolute top-1/2 left-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 px-4 sm:px-6 lg:px-8">
          <label className="pointer-events-auto flex min-w-0 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-500 shadow-sm transition-colors focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-cyan-100">
            <Search className="h-4 w-4 shrink-0 text-cyan-500" />
            <input
              type="text"
              value={inputSearchTitle}
              onChange={(e) => setInputSearchTitle(e.target.value)}
              aria-label="Search posts"
              placeholder="Search anything..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-cyan-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-200 hover:bg-cyan-50 sm:inline-flex"
          >
            Log In
          </button>
          <Link
            href="/createPost"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-cyan-500 px-4 py-2 text-sm leading-none font-semibold text-white shadow-sm shadow-cyan-200 transition-colors hover:bg-cyan-600"
          >
            <CirclePlus className="h-4 w-4 shrink-0 text-white" />
            <span className="leading-none">Create</span>
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-100 bg-white text-cyan-700 shadow-sm transition-colors hover:border-cyan-200 hover:bg-cyan-50"
            aria-label="Open account menu"
          >
            <span className="text-lg font-semibold">N</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
