"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mockedPosts } from "../components/mockedPosts/mockedPost";
import { PostContext } from "./PostContext";

export const UIContext = createContext();

export default function UIProvider({ children }) {
  const { posts } = useContext(PostContext);
  const [filter, setFilter] = useState("All");
  const [sortOption, setSortOption] = useState("Default");
  const [inputSearchTitle, setInputSearchTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
  console.log(filteredPosts);

  return (
    <UIContext.Provider
      value={{
        filter,
        setFilter,
        sortOption,
        sidebarOpen,
        filteredPosts,
        searchResults,
        setSortOption,
        setSidebarOpen,
        inputSearchTitle,
        setInputSearchTitle,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
