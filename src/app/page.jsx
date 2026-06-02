"use client";

import { useState } from "react";
import { useEffect } from "react";
import { mockedPosts } from "./components/mockedPosts/mockedPost";
import CreatePost from "./components/createPost/CreatePost";
import NavBar from "./components/navBar/NavBar";
import PostList from "./components/postList/PostList";

function App() {
  const [posts, setPosts] = useState(mockedPosts);

  const [inputSearchTitle, setInputSearchTitle] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(inputSearchTitle.toLowerCase()),
  );

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

  function deletePost(postId) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
      <NavBar
        inputSearchTitle={inputSearchTitle}
        setInputSearchTitle={setInputSearchTitle}
      />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <PostList
            posts={posts}
            filteredPosts={filteredPosts}
            toggleUpvote={toggleUpvote}
            toggleDownvote={toggleDownvote}
            deletePost={deletePost}
            editPost={editPost}
          />
          <aside className="sticky space-y-6 self-start lg:sticky lg:top-8">
            <CreatePost addPost={addPost} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
