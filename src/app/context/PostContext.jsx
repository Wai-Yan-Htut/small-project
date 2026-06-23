"use client";

import { createContext, useEffect, useState } from "react";
import { mockedPosts } from "../components/mockedPosts/mockedPost";

export const PostContext = createContext();

export default function PostProvider({ children }) {
  const [posts, setPosts] = useState(mockedPosts);
  const [filter, setFilter] = useState("All");
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputSearchTitle, setInputSearchTitle] = useState("");

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
        setPosts,
        filter,
        setFilter,
        inputSearchTitle,
        setInputSearchTitle,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
