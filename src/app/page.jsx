"use client";

import { useState } from "react";
import { useEffect } from "react";
import { mockedPosts } from "./components/mockedPosts/mockedPost";
import CreatePost from "./components/createPost/CreatePost";
import FilterPost from "./components/filterPost/FilterPost";
import PostStats from "./components/postStats/PostStats";
import SearchPost from "./components/searchPost/SearchPost";
import PostList from "./components/postList/PostList";

function App() {
  const [posts, setPosts] = useState(mockedPosts);

  const [inputSearchTitle, setInputSearchTitle] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredPosts = posts
    .filter(matchFilter)
    .filter((post) =>
      post.title.toLowerCase().includes(inputSearchTitle.toLowerCase()),
    );

  function matchFilter(post) {
    if (filter === "All") return true;
    if (filter === "Completed") return post.completed;
    return !post.completed;
  }

  function markComplete(idToMark) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === idToMark) {
          return { ...post, completed: true };
        } else {
          return post;
        }
      }),
    );
  }

  function addPost(inputPostTitle, inputPostContent) {
    const newPost = {
      id: Date.now(),
      title: inputPostTitle,
      content: inputPostContent,
      completed: false,
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
  }

  function editPost(idToEdit, inputEditTitle, inputEditContent) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === idToEdit) {
          return { ...post, title: inputEditTitle, content: inputEditContent };
        } else {
          return post;
        }
      }),
    );
  }

  function deletePost(postId) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }

  function clearCompleted() {
    setPosts((prevPosts) => prevPosts.filter((post) => !post.completed));
  }

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log("posts saved");
  }, [posts]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Home Feed
          </h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <PostList
            posts={posts}
            filteredPosts={filteredPosts}
            markComplete={markComplete}
            deletePost={deletePost}
            editPost={editPost}
          />
          <aside className="space-y-6 self-start lg:sticky lg:top-8">
            <SearchPost
              inputSearchTitle={inputSearchTitle}
              setInputSearchTitle={setInputSearchTitle}
            />
            <button
              onClick={() => clearCompleted()}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-rose-500 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            >
              Clear Completed
            </button>
            <FilterPost filteredPosts={filteredPosts} setFilter={setFilter} />
            <CreatePost addPost={addPost} />
            <PostStats posts={posts} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
