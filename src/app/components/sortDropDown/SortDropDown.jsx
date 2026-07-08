"use client";

import { useContext } from "react";
import { PostContext } from "../../context/PostContext";

export default function SortDropDown() {
  const { sortOption, setSortOption } = useContext(PostContext);

  const options = [
    { label: "Default", value: "Default" },
    { label: "New", value: "New" },
    { label: "Old", value: "Old" },
    { label: "Most Votes", value: "MostVotes" },
    { label: "Least Votes", value: "LeastVotes" },
    { label: "A-Z", value: "A-Z" },
    { label: "Z-A", value: "Z-A" },
  ];

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="w-full bg-transparent px-0 pt-0 transition-all duration-300 ease-in-out">
      <div className="inline-flex">
        <select
          value={sortOption}
          onChange={handleSortChange}
          aria-label="Sort posts"
          className="h-8 cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-3 pr-8 text-xs font-semibold text-slate-700 shadow-sm transition-colors outline-none hover:border-cyan-200 hover:text-cyan-700 hover:shadow-md focus:border-cyan-400"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
