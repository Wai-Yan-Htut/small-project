import { useState } from "react";

export default function EditPost({ post, setIsEditing, editPost }) {
  const [inputEditTitle, setInputEditTitle] = useState(post.title);
  const [inputEditContent, setInputEditContent] = useState(post.content);

  return (
    <div className="flex flex-col gap-4 p-5">
      <h2 className="text-lg font-semibold tracking-tight text-slate-900">
        Edit Post
      </h2>
      <div className="space-y-3">
        <label className="block space-y-1">
          <span className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
            Title
          </span>
          <input
            type="text"
            placeholder="Enter new post title..."
            value={inputEditTitle}
            onChange={(event) => setInputEditTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
            Content
          </span>
          <input
            type="text"
            placeholder="Enter new post content..."
            value={inputEditContent}
            onChange={(event) => setInputEditContent(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
          />
        </label>

        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => {
              editPost(post.id, inputEditTitle, inputEditContent);
              setIsEditing(false);
            }}
            className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setInputEditTitle(post.title);
              setInputEditContent(post.content);
            }}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
