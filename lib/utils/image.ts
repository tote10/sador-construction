// lib/utils/image.ts
export async function compressImageFile(file: File, maxWidth = 2000, maxKB = 300): Promise<Blob> {
  if (!file.type.startsWith('image/')) throw new Error('Not an image');

  const img = await new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = URL.createObjectURL(file);
  });

  const ratio = Math.min(1, maxWidth / img.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * ratio);
  canvas.height = Math.round(img.height * ratio);
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  let quality = 0.9;
  let blob: Blob | null = null;
  for (let i = 0; i < 8; i++) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), 'image/jpeg', quality)
    );
    if (!blob) break;
    const kb = blob.size / 1024;
    if (kb <= maxKB) break;
    quality *= 0.75; // reduce quality progressively
  }

  if (!blob) throw new Error('Compression failed');
  return blob;
}