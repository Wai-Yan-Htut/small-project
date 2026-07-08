"use client";

import Link from "next/link";
import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { Menu, Home, TrendingUp, PlusCircle } from "lucide-react";

export default function SideBar() {
  const { setFilter, sidebarOpen, setSidebarOpen } = useContext(PostContext);

  return (
    <div>
      <aside
        className={`bg-background fixed top-14 bottom-0 left-0 z-40 flex flex-col border-r border-slate-300/80 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-56" : "w-12"
        }`}
      >
        <nav
          className={`mt-4 flex flex-col gap-2 px-2 transition-all duration-300 ease-in-out ${
            sidebarOpen
              ? "pointer-events-auto translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-2 opacity-0"
          }`}
        >
          <Link
            href={`/`}
            onClick={() => setFilter("All")}
            className="text-foreground focus:ring-primary flex items-center gap-3 rounded-md px-4 py-3 text-base leading-5 font-medium transition-colors hover:bg-cyan-50"
          >
            <Home size={18} className="shrink-0" aria-hidden="true" />
            Home
          </Link>

          <Link
            href={`/`}
            onClick={() => setFilter("Popular")}
            className="text-foreground/80 focus:ring-primary flex items-center gap-3 rounded-md px-4 py-3 text-base leading-5 font-medium transition-colors hover:bg-cyan-50"
          >
            <TrendingUp size={18} className="shrink-0" aria-hidden="true" />
            Popular
          </Link>

          <Link
            href={`/`}
            onClick={() => setFilter("New")}
            className="text-foreground/80 focus:ring-primary flex items-center gap-3 rounded-md px-4 py-3 text-base leading-5 font-medium transition-colors hover:bg-cyan-50"
          >
            <PlusCircle size={18} className="shrink-0" aria-hidden="true" />
            New
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background hover:text-primary text-muted-foreground absolute top-8 -right-4 z-60 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-300/80 shadow-sm transition-all lg:flex"
          aria-expanded={sidebarOpen}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu size={14} />
        </button>
      </aside>
    </div>
  );
}
