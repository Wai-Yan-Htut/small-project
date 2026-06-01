export default function SearchPost({ inputSearchTitle, setInputSearchTitle }) {
  return (
    <div>
      <input
        type="text"
        aria-label="Search posts"
        placeholder="Search anything..."
        value={inputSearchTitle}
        onChange={(event) => setInputSearchTitle(event.target.value)}
        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
