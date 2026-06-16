"use client";

import { useEffect, useState } from "react";

export default function PostCreationPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [tempPosts, setTempPosts] = useState(null);
  const [inputPostTitle, setInputPostTitle] = useState("");
  const [inputPostContent, setInputPostContent] = useState("");

  const validField =
    inputPostTitle.trim() !== "" && inputPostContent.trim() !== "";

  const validMaxChar =
    inputPostTitle.length <= 50 && inputPostContent.length <= 200;

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    setTempPosts(savedPosts);
    setIsLoaded(true);
  }, []);

  function addPost(inputPostTitle, inputPostContent) {
    const newPost = {
      id: Date.now(),
      title: inputPostTitle,
      content: inputPostContent,
      vote: 0,
      voteAction: null,
      comments: [],
      createdAt: Date.now(),
    };
    setTempPosts((prevTempPosts) => [...prevTempPosts, newPost]);
  }

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("posts", JSON.stringify(tempPosts));
    console.log(JSON.parse(localStorage.getItem("posts")));
  }, [tempPosts, isLoaded]);

  return (
    <div>
      {!tempPosts ? (
        <h1>Loading...</h1>
      ) : (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Create New Post
              </h2>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label className="block text-right text-sm font-medium text-slate-700">
                  Post Title
                </label>
                {inputPostTitle.length <= 50 ? (
                  <span className="text-sm text-slate-600">
                    Title count: {inputPostTitle.length}/50
                  </span>
                ) : (
                  <span className="text-sm text-red-500">
                    Title count: {inputPostTitle.length}/50
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter post title..."
                value={inputPostTitle}
                onChange={(event) => setInputPostTitle(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-4">
                <label className="block text-right text-sm font-medium text-slate-700">
                  Post Content
                </label>
                {inputPostContent.length <= 200 ? (
                  <span className="text-sm text-slate-600">
                    Content count: {inputPostContent.length}/200
                  </span>
                ) : (
                  <span className="text-sm text-red-500">
                    Content count: {inputPostContent.length}/200
                  </span>
                )}
              </div>
              <input
                type="text"
                placeholder="Enter post content..."
                value={inputPostContent}
                onChange={(event) => setInputPostContent(event.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-2 text-slate-700 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 focus:outline-none"
              />
            </div>
            {validField && validMaxChar ? (
              <button
                onClick={() => {
                  addPost(inputPostTitle, inputPostContent);
                  setInputPostTitle("");
                  setInputPostContent("");
                }}
                className="w-full rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-emerald-600"
              >
                Add Post
              </button>
            ) : (
              <button
                disabled={true}
                className="w-full rounded-xl bg-emerald-200 px-4 py-2 font-semibold text-emerald-500 transition-colors duration-200"
              >
                Add Post
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
