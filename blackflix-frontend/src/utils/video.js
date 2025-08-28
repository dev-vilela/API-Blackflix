// Converte links do YouTube para embed; MP4 usa <video>
export function toEmbedUrl(url = "") {
  if (!url) return "";
  const u = url.trim();

  // YouTube formatos comuns
  if (u.includes("youtube.com/watch?v=")) {
    const id = new URL(u).searchParams.get("v");
    return `https://www.youtube.com/embed/${id}`;
  }
  if (u.includes("youtu.be/")) {
    const id = u.split("youtu.be/")[1].split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${id}`;
  }

  // Vimeo simples (opcional)
  if (u.includes("vimeo.com/")) {
    const id = u.split("vimeo.com/")[1].split(/[?&]/)[0];
    return `https://player.vimeo.com/video/${id}`;
  }

  // Outros: retornamos a própria URL
  return u;
}

export function isMp4(url = "") {
  return url.toLowerCase().includes(".mp4");
}
