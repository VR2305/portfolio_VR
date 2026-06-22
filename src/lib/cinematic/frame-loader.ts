/**
 * Handles preloading of image sequences.
 */
export class FrameLoader {
  private cache: Map<string, HTMLImageElement> = new Map();

  async preload(
    paths: string[],
    onProgress?: (progress: number) => void,
    concurrency = 6
  ): Promise<HTMLImageElement[]> {
    const total = paths.length;
    let loaded = 0;
    const results: HTMLImageElement[] = [];

    const loadOne = async (path: string): Promise<HTMLImageElement> => {
      return new Promise<HTMLImageElement>((resolve) => {
        if (this.cache.has(path)) {
          loaded++;
          onProgress?.(loaded / total);
          resolve(this.cache.get(path)!);
          return;
        }

        const img = new Image();
        img.src = path;
        img.onload = () => {
          this.cache.set(path, img);
          loaded++;
          onProgress?.(loaded / total);
          resolve(img);
        };
        img.onerror = (e) => {
          console.warn(`Failed to load frame: ${path}`, e);
          loaded++;
          onProgress?.(loaded / total);
          resolve(img); // Resolve with the img object anyway to prevent Promise.all crashes
        };
      });
    };

    // Use a worker pool pattern to process items concurrently up to the specified limit
    const queue = [...paths];
    const workers = Array(Math.min(concurrency, queue.length))
      .fill(null)
      .map(async () => {
        while (queue.length > 0) {
          const path = queue.shift();
          if (path) {
            const img = await loadOne(path);
            results.push(img);
          }
        }
      });

    await Promise.all(workers);
    return results;
  }

  getFrame(path: string): HTMLImageElement | undefined {
    return this.cache.get(path);
  }

  clear() {
    this.cache.clear();
  }
}

export const frameLoader = new FrameLoader();
