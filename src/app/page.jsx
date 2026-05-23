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
    .filter((post) => {
      // return filter === "All"
      //   ? post
      //   : filter === "Completed"
      //     ? post.completed
      //     : !post.completed;
      if (filter === "All") return true;
      if (filter === "Completed") return post.completed;
      return !post.completed;
    })
    .filter((post) =>
      post.title
        .toLocaleLowerCase()
        .includes(inputSearchTitle.toLocaleLowerCase()),
    );

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
    setPosts([...posts, newPost]);
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
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-center text-4xl font-bold text-gray-900 mb-8">
          Home Feed
        </h1>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <PostList
            posts={posts}
            filteredPosts={filteredPosts}
            markComplete={markComplete}
            deletePost={deletePost}
          />
          <aside className="space-y-6 self-start lg:sticky lg:top-8">
            <SearchPost
              inputSearchTitle={inputSearchTitle}
              setInputSearchTitle={setInputSearchTitle}
            />
            <button
              onClick={() => clearCompleted()}
              className="flex-1 w-full px-3 h-10 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors"
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
