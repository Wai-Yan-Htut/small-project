export default function FilterPost({ filteredPosts, setFilter }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            Filter Posts
          </h2>
        </div>
        {filteredPosts.length > 1 ? (
          <p className="text-right text-sm text-slate-600">
            {filteredPosts.length} posts found
          </p>
        ) : (
          <p className="text-right text-sm text-slate-600">
            {filteredPosts.length} post found
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => setFilter("All")}
          className="w-full rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
        >
          All
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className="w-full rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("Incomplete")}
          className="w-full rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-rose-600"
        >
          Incomplete
        </button>
      </div>
    </div>
  );
}
