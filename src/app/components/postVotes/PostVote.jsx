import { useContext } from "react";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { PostContext } from "../../context/PostContext";

export default function PostVote({ post }) {
  const { setPosts } = useContext(PostContext);

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

  return (
    <div className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1.5 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-white hover:ring-cyan-200">
      <button
        onClick={() => toggleUpvote(post.id)}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          post.voteAction === "up"
            ? "bg-cyan-500"
            : "text-slate-500 hover:bg-cyan-100"
        }`}
      >
        <ArrowBigUp className="h-3.5 w-3.5" />
      </button>

      <span className="flex min-w-8 items-center justify-center px-2 text-sm font-semibold text-slate-900">
        {post.vote}
      </span>

      <button
        onClick={() => toggleDownvote(post.id)}
        className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
          post.voteAction === "down"
            ? "bg-purple-600"
            : "text-slate-500 hover:bg-cyan-100"
        }`}
      >
        <ArrowBigDown className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
