"use client";

import { useState } from "react";

export default function CreatePost({ addPost }) {
  const [inputPostTitle, setInputPostTitle] = useState("");
  const [inputPostContent, setInputPostContent] = useState("");

  const validField =
    inputPostTitle.trim() !== "" && inputPostContent.trim() !== "";

  const validMaxChar =
    inputPostTitle.length <= 30 && inputPostContent.length <= 100;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Post</h2>
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label className="block text-sm font-medium text-gray-700 text-right">
              Post Title
            </label>
            {inputPostTitle.length <= 30 ? (
              <span className="text-sm text-gray-700">
                Title count: {inputPostTitle.length}/30
              </span>
            ) : (
              <span className="text-sm text-red-500">
                Title count: {inputPostTitle.length}/30
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter post title..."
            value={inputPostTitle}
            onChange={(event) => setInputPostTitle(event.target.value)}
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label className="block text-sm font-medium text-gray-700 text-right">
              Post Content
            </label>
            {inputPostContent.length <= 100 ? (
              <span className="text-sm text-gray-700">
                Content count: {inputPostContent.length}/100
              </span>
            ) : (
              <span className="text-sm text-red-500">
                Content count: {inputPostContent.length}/100
              </span>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter post content..."
            value={inputPostContent}
            onChange={(event) => setInputPostContent(event.target.value)}
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
        {validField && validMaxChar ? (
          <button
            onClick={() => {
              addPost(inputPostTitle, inputPostContent);
              setInputPostTitle("");
              setInputPostContent("");
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Post
          </button>
        ) : (
          <button
            disabled={true}
            className="w-full bg-green-300 hover:bg-green-200 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Post
          </button>
        )}
      </div>
    </div>
  );
}
