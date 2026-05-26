export default function SearchPost({ inputSearchTitle, setInputSearchTitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-4">
        <div>
          <h2 className="mt-1 text-lg font-bold text-slate-900">Find posts</h2>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search for post"
        value={inputSearchTitle}
        onChange={(event) => setInputSearchTitle(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 placeholder:text-slate-400 shadow-inner focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
      />
    </div>
  );
}
