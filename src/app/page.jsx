"use client";

import { useState } from "react";
import { useEffect } from "react";
import { mockedPosts } from "./components/mockedPosts/mockedPost";
import CreatePost from "./components/createPost/CreatePost";
// import FilterPost from "./components/filterPost/FilterPost";
import NavBar from "./components/navBar/NavBar";
import PostList from "./components/postList/PostList";

function App() {
  const [posts, setPosts] = useState(mockedPosts);

  const [inputSearchTitle, setInputSearchTitle] = useState("");
  // const [filter, setFilter] = useState("All");

  const filteredPosts = posts
    // .filter(matchFilter)
    .filter((post) =>
      post.title.toLowerCase().includes(inputSearchTitle.toLowerCase()),
    );

  // function matchFilter(post) {
  //   if (filter === "All") return true;
  //   if (filter === "Completed") return post.completed;
  //   return !post.completed;
  // }

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
            deletePost={deletePost}
            editPost={editPost}
          />
          <aside className="space-y-6 self-start lg:sticky lg:top-8">
            {/* <FilterPost filteredPosts={filteredPosts} setFilter={setFilter} /> */}
            <CreatePost addPost={addPost} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
