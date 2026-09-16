/**
 * Media is served same-origin through the `/media/*` rewrite in
 * `next.config.ts`, so stored `src` values keep the site's own origin rather
 * than the backend's. The API returns `file_url` either absolute
 * (`http://<backend>/media/...`) or already relative, so both are folded down
 * to the same `/media/...` form before being written into section content.
 */
export function toMediaPath(fileUrl: string) {
  const trimmed = fileUrl.trim();

  if (!trimmed) return trimmed;

  const mediaIndex = trimmed.indexOf('/media/');

  if (mediaIndex !== -1) {
    return trimmed.slice(mediaIndex);
  }

  // Anything outside the media tree (an absolute URL to another host, say) is
  // left as-is for the caller to deal with.
  return trimmed;
}
