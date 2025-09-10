export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds

  const minute = 60;
  const hour = 60 * 60;
  const day = 60 * 60 * 24;
  const month = 60 * 60 * 24 * 30;
  const year = 60 * 60 * 24 * 365;

  if (diff < hour) {
    return `${Math.floor(diff / minute)} minutes ago`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)} hours ago`;
  } else if (diff < month) {
    return `${Math.floor(diff / day)} days ago`;
  } else if (diff < year) {
    return `${Math.floor(diff / month)} months ago`;
  } else {
    return `${Math.floor(diff / year)} years ago`;
  }
}
