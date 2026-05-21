export default function SearchPost({ inputSearchTitle, setInputSearchTitle }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for post"
        value={inputSearchTitle}
        onChange={(event) => setInputSearchTitle(event.target.value)}
        className="w-full px-3 h-10 rounded-l border-2 text-gray-900 border-sky-500 focus:outline-none focus:border-sky-500"
      />
    </div>
  );
}
