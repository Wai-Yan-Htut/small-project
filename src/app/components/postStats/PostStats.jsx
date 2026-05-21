export default function PostStats({ posts }) {
  const allPostCount = posts.length;
  const completedPostCount = posts.filter((post) => post.completed).length;
  const incompletePostCount = posts.filter((post) => !post.completed).length;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Summary
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Post Stats</h2>
        </div>
        <div className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
          Live
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="text-sm font-medium text-slate-600">All Posts</span>
          <span className="text-lg font-bold text-slate-900">
            {allPostCount}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-3">
          <span className="text-sm font-medium text-emerald-700">
            Completed
          </span>
          <span className="text-lg font-bold text-emerald-700">
            {completedPostCount}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-rose-50 px-4 py-3">
          <span className="text-sm font-medium text-rose-700">Incomplete</span>
          <span className="text-lg font-bold text-rose-700">
            {incompletePostCount}
          </span>
        </div>
      </div>
    </div>
  );
}
