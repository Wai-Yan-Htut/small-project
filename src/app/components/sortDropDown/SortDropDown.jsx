"use client";

import { useContext } from "react";
import { PostContext } from "../../context/PostContext";

export default function SortDropDown() {
  const { setSortOption } = useContext(PostContext);

  const handleChange = (event) => {
    setSortOption(event.target.value);
  };
  return (
    <select onChange={handleChange}>
      <option value="Default">Default</option>
      <option value="New">New</option>
      <option value="Old">Old</option>
      <option value="MostVotes">Most Votes</option>
      <option value="LeastVotes">Least Votes</option>
      <option value="A-Z">A-Z</option>
      <option value="Z-A">Z-A</option>
    </select>
  );
}
