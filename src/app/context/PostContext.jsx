"use client";

import { createContext, useEffect, useState } from "react";
import { mockedPosts } from "../components/mockedPosts/mockedPost";

export const PostContext = createContext();

export default function PostProvider({ children }) {
  const [posts, setPosts] = useState(mockedPosts);
  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputSearchTitle, setInputSearchTitle] = useState("");

  function filterPosts() {
    if (filter === "Popular") {
      return posts.filter((post) => post.vote > 10);
    }
    if (filter === "New") {
      return posts.filter(
        (post) => Math.floor((Date.now() - post.createdAt) / 1000) < 86400,
      );
    }
    return posts;
  }

  const filteredPosts = filterPosts();

  const searchResults = posts.filter((post) =>
    post.title.toLowerCase().includes(inputSearchTitle.toLowerCase()),
  );

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

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts) {
      setPosts(savedPosts);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts, isLoaded]);

  return (
    <PostContext.Provider
      value={{
        posts,
        filter,
        editPost,
        setPosts,
        setFilter,
        sortOption,
        deletePost,
        toggleUpvote,
        searchResults,
        setSortOption,
        filteredPosts,
        toggleDownvote,
        inputSearchTitle,
        setInputSearchTitle,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
