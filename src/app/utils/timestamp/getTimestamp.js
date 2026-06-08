export function getTimestamp(createdAt) {
  const seconds = Math.floor((Date.now() - createdAt) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
  }
  if (minutes < 60) {
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  }
  if (hours < 24) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  }
  if (days < 365) {
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  }
}
