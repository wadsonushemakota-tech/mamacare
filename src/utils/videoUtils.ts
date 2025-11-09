export const getEmbedUrl = (url: string): string => {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtube.com/watch?v=') 
      ? url.split('v=')[1].split('&')[0]
      : url.split('youtu.be/')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  
  // TikTok
  if (url.includes('tiktok.com')) {
    const videoId = url.split('/video/')[1].split('?')[0];
    return `https://www.tiktok.com/embed/${videoId}`;
  }

  // Instagram
  if (url.includes('instagram.com/p/') || url.includes('instagram.com/reel/')) {
    const postId = url.split('/p/')[1]?.split('/')[0] || url.split('/reel/')[1]?.split('/')[0];
    return `https://www.instagram.com/p/${postId}/embed`;
  }

  return url;
};