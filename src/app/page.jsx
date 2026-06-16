"use client";

import { useState } from "react";
import { useEffect } from "react";
import NavBar from "./components/navBar/NavBar";
import SideBar from "./components/sideBar/SideBar";
import PostList from "./components/postList/PostList";
import { mockedPosts } from "./components/mockedPosts/mockedPost";

function App() {
  const [posts, setPosts] = useState(mockedPosts);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputSearchTitle, setInputSearchTitle] = useState("");
  const [filter, setFilter] = useState("All");

  console.log("Render", posts.length);

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

  function toggleUpvote(idToUpvote) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === idToUpvote) {
          switch (post.voteAction) {
            case "up":
              return { ...post, vote: post.vote - 1, voteAction: null };
            case "down":
              return { ...post, vote: post.vote + 2, voteAction: "up" };
            case null:
              return { ...post, vote: post.vote + 1, voteAction: "up" };
          }
        } else {
          return post;
        }
      }),
    );
  }

  function toggleDownvote(idToDownvote) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === idToDownvote) {
          switch (post.voteAction) {
            case "down":
              return { ...post, vote: post.vote + 1, voteAction: null };
            case "up":
              return { ...post, vote: post.vote - 2, voteAction: "down" };
            case null:
              return { ...post, vote: post.vote - 1, voteAction: "down" };
          }
        } else {
          return post;
        }
      }),
    );
  }

  useEffect(() => {
    console.log("Start Loading");
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setPosts(parsedPosts);
    }
    setIsLoaded(true);
    console.log("Loaded");
  }, []);

  useEffect(() => {
    if (!isLoaded) return console.log("Not save");
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log("Saved");
  }, [posts, isLoaded]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-slate-50 to-slate-100 text-slate-900">
      <NavBar
        inputSearchTitle={inputSearchTitle}
        setInputSearchTitle={setInputSearchTitle}
      />
      <SideBar setFilter={setFilter} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)_380px] xl:gap-10">
          <aside className="sticky top-8 hidden self-start lg:block"></aside>
          <PostList
            posts={posts}
            filteredPosts={filteredPosts}
            editPost={editPost}
            deletePost={deletePost}
            toggleUpvote={toggleUpvote}
            toggleDownvote={toggleDownvote}
          />
          <aside className="sticky space-y-6 self-start lg:sticky lg:top-8"></aside>
        </div>
      </div>
    </div>
  );
}

export default App;
