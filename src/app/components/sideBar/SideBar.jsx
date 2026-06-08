"use client";

import { useState } from "react";
import { Menu, Home, TrendingUp, PlusCircle } from "lucide-react";

export default function SideBar({ setFilter }) {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <aside
        className={`bg-background fixed top-14 bottom-0 left-0 z-40 flex flex-col border-r border-slate-300/80 transition-all duration-300 ease-in-out ${
          sideBarOpen ? "w-56" : "w-12"
        }`}
      >
        {sideBarOpen && (
          <nav className="mt-4 flex flex-col gap-2 px-2">
            <button
              onClick={() => setFilter("All")}
              className="text-foreground focus:ring-primary flex items-center gap-3 rounded-md px-4 py-3 text-base leading-5 font-medium transition-colors hover:bg-cyan-50"
            >
              <Home size={18} className="shrink-0" aria-hidden="true" />
              Home
            </button>

            <button
              onClick={() => setFilter("Popular")}
              className="text-foreground/80 focus:ring-primary flex items-center gap-3 rounded-md px-4 py-3 text-base leading-5 font-medium transition-colors hover:bg-cyan-50"
            >
              <TrendingUp size={18} className="shrink-0" aria-hidden="true" />
              Popular
            </button>

            <button
              onClick={() => setFilter("New")}
              className="text-foreground/80 focus:ring-primary flex items-center gap-3 rounded-md px-4 py-3 text-base leading-5 font-medium transition-colors hover:bg-cyan-50"
            >
              <PlusCircle size={18} className="shrink-0" aria-hidden="true" />
              New
            </button>
          </nav>
        )}

        <button
          type="button"
          onClick={() => setSidebarOpen(!sideBarOpen)}
          className="bg-background hover:text-primary text-muted-foreground absolute top-8 -right-4 z-60 hidden h-8 w-8 items-center justify-center rounded-full border border-slate-300/80 shadow-sm transition-all lg:flex"
          aria-expanded={sideBarOpen}
          aria-label={sideBarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu size={14} />
        </button>
      </aside>
    </div>
  );
}
