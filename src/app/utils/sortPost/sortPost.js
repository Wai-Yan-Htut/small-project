export function sortPost(array, option) {
  if (option === "New") {
    return [...array].sort((a, b) => b.createdAt - a.createdAt);
  }
  if (option === "Old") {
    return [...array].sort((a, b) => a.createdAt - b.createdAt);
  }
  return array;
}
