/**
 * Optimized Render Engine for cinematic canvas playback.
 * Features:
 * - High DPI support
 * - Object-fit: cover scaling
 * - Dynamic alignment & scaling support
 */
export type CanvasAlignment = 'center' | 'bottom-left' | 'bottom-right' | number;

export class RenderEngine {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private dpr: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d', { 
      alpha: true, 
      desynchronized: true 
    });
    if (!context) throw new Error('Could not get 2D context');
    this.ctx = context;
    this.resize();
  }

  resize() {
    this.dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;

    this.ctx.scale(this.dpr, this.dpr);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  drawFrame(img: HTMLImageElement, alignment: CanvasAlignment = 'center', scale: number = 1) {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    // Handle broken or loading/empty images safely to prevent division by zero or NaN issues
    if (!img || img.width === 0 || img.height === 0) {
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      return;
    }

    const imgWidth = img.width * scale;
    const imgHeight = img.height * scale;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      
      if (typeof alignment === 'number') {
        offsetY = canvasHeight - drawHeight; // Always pin bottom for cinematic shots
        offsetX = 0; // The image spans full width, so no horizontal offset needed here
      } else if (alignment === 'bottom-left' || alignment === 'bottom-right') {
        offsetY = canvasHeight - drawHeight;
        offsetX = 0;
      } else {
        offsetY = (canvasHeight - drawHeight) / 2;
        offsetX = 0;
      }
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawHeight = canvasHeight;
      offsetY = 0;
      
      if (typeof alignment === 'number') {
        offsetX = (canvasWidth - drawWidth) * alignment;
      } else if (alignment === 'bottom-left') {
        offsetX = 0;
      } else if (alignment === 'bottom-right') {
        offsetX = canvasWidth - drawWidth;
      } else {
        offsetX = (canvasWidth - drawWidth) / 2;
      }
    }

    // Apply scaling factor by modifying the draw dimensions further if needed
    // However, the above logic already uses scaled imgWidth/imgHeight.
    // If scale < 1, the image might not cover the canvas.
    // We should ensure the canvas is cleared to black.

    this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Shift avatar down to prevent overlap with the top navigation bar
    const yOffset = 45;
    this.ctx.drawImage(img, offsetX, offsetY + yOffset, drawWidth, drawHeight);
  }
}
