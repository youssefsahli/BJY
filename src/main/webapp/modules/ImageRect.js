import { Rect } from "./Rect.js";

export class ImageRect extends Rect {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.image = new Image();
        this.imageLoaded = false;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
    }

    set imageUrl(url) {
        this.loadImage(url);
    }

    loadImage(src) {
        this.image.src = src;
    }

   render(ctx) {
    this.ctx = ctx; // Store the context for potential future use
    if (this.imageLoaded) {
        // Calculate the best fit scaling factor while keeping the aspect ratio
        const scaleX = this.w / this.image.naturalWidth;
        const scaleY = this.h / this.image.naturalHeight;
        const scale = Math.min(scaleX, scaleY);

        // Calculate the new image dimensions
        const imgW = this.image.naturalWidth * scale;
        const imgH = this.image.naturalHeight * scale;

        // Calculate position to center the image in the rectangle
        const imgX = this.x + (this.w - imgW) / 2;
        const imgY = this.y + (this.h - imgH) / 2;

        // Draw the image scaled and centered
        ctx.drawImage(this.image, imgX, imgY, imgW, imgH);
    } else {
        super.render(ctx); // Call the render method of the base class to draw rectangle
    }
}

}
