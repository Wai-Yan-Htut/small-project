export function sortPost(array, option) {
  switch (option) {
    default:
      return array;
    case "Default":
      return array;
    case "New":
      return [...array].sort((a, b) => b.createdAt - a.createdAt);
    case "Old":
      return [...array].sort((a, b) => a.createdAt - b.createdAt);
    case "LeastVotes":
      return [...array].sort((a, b) => a.vote - b.vote);
    case "MostVotes":
      return [...array].sort((a, b) => b.vote - a.vote);
    case "A-Z":
      return [...array].sort((a, b) => a.title.localeCompare(b.title));
    case "Z-A":
      return [...array].sort((a, b) => b.title.localeCompare(a.title));
  }
}
