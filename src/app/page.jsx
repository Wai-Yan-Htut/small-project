"use client";

import { useContext } from "react";
import { PostContext } from "./context/PostContext";
import PostList from "./components/postList/PostList";

function App() {
  const { posts, setPosts, filter, inputSearchTitle } = useContext(PostContext);

  function filterPosts() {
    if (filter === "All") {
      return posts;
    }
    if (filter === "Popular") {
      return posts.filter((post) => post.vote > 10);
    }
    if (filter === "New") {
      return posts.filter(
        (post) => Math.floor((Date.now() - post.createdAt) / 1000) < 86400,
      );
    }
  }

  const filteredPosts = filterPosts().filter((post) =>
    post.title.toLowerCase().includes(inputSearchTitle.toLowerCase()),
  );

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

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)_380px] xl:gap-10">
          <aside className="sticky top-8 hidden self-start lg:block"></aside>
          <PostList
            posts={posts}
            filteredPosts={filteredPosts}
            editPost={editPost}
            deletePost={deletePost}
          />
          <aside className="sticky space-y-6 self-start lg:sticky lg:top-8"></aside>
        </div>
      </div>
    </div>
  );
}

export default App;
