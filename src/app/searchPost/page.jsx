"use client";

import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import PostList from "../components/postList/PostList";

function App() {
  const { posts, searchResults, sidebarOpen } = useContext(PostContext);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <div
        className={`mx-auto max-w-7xl px-4 py-4 transition-[padding-left] duration-300 ease-in-out sm:px-6 lg:px-8 ${
          sidebarOpen ? "lg:pl-16" : "lg:pl-0"
        }`}
      >
        <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)_380px] xl:gap-10">
          <aside className="sticky top-8 hidden self-start lg:block"></aside>
          <PostList posts={posts} filteredPosts={searchResults} />
          <aside className="sticky space-y-6 self-start lg:sticky lg:top-8"></aside>
        </div>
      </div>
    </div>
  );
}

export default App;
