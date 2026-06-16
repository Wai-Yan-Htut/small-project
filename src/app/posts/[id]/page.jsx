"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import CommentCard from "./components/commentCard/CommentCard";
import { getTimestamp } from "../../utils/timestamp/getTimestamp";
import DetailedVote from "./components/detailedPageVote/DetailedVote";
import { MessageCircleMore, PencilLine, Share2, Trash2 } from "lucide-react";

export default function PostDetailsPage({ params }) {
  const { id } = React.use(params);
  const [posts, setPosts] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function getPost() {
    if (posts) {
      return posts.find((post) => post.id === Number(id));
    } else {
      return;
    }
  }

  const targetPost = getPost();

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

  function createComment(inputComment, idToComment) {
    const newComment = {
      id: Date.now(),
      username: "user",
      content: inputComment,
      createdAt: Date.now(),
    };
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === idToComment) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      }),
    );
  }

  function deleteComment(postID, idToDelete) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postID) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment.id !== idToDelete,
            ),
          };
        }
        return post;
      }),
    );
    console.log(posts);
  }

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    setPosts(savedPosts);
    setIsLoaded(true);
  }, [id]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts, isLoaded]);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
      {!posts ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col">
          <div className="min-w-0 flex-1 p-5">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="mb-1 flex text-xs text-slate-500">
                  r/shrimpapp • {getTimestamp(targetPost.createdAt)}
                </span>
                <h2 className="truncate text-lg font-semibold tracking-tight text-slate-900">
                  {targetPost.title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-700"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <PencilLine className="h-3.5 w-3.5" />
                    Edit
                  </span>
                </button>
              </div>
            </div>

            <p className="mb-4 text-sm leading-6 text-slate-600">
              {targetPost.content}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <DetailedVote
                post={targetPost}
                toggleUpvote={toggleUpvote}
                toggleDownvote={toggleDownvote}
              />
              <Link
                className="ml-1 inline-flex min-w-15 items-center justify-center gap-2 rounded-full px-3 py-1.5 text-sm leading-none font-medium text-slate-600 transition-colors hover:bg-cyan-100 hover:text-cyan-700"
                href={`/posts/${targetPost.id}`}
              >
                <MessageCircleMore className="h-4 w-4 shrink-0" />
                {targetPost.comments.length}
              </Link>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-cyan-100 hover:text-cyan-700"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>

              <button
                type="button"
                onClick={() => deletePost(targetPost.id)}
                className="ml-auto inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-700"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </span>
              </button>
            </div>
          </div>
          <CommentCard
            postId={targetPost.id}
            comments={targetPost.comments}
            createComment={createComment}
            deleteComment={deleteComment}
          />
        </div>
      )}
    </article>
  );
}
