class Sprite {
    constructor({
                    position,
                    height,
                    width,
                    imageSrc,
                    scale = 1,
                    maxFrames = 1,
        holdFrames
                }) {
        this.position = position;
        this.height = height;
        this.width = width;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrames = maxFrames;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.holdFrames = holdFrames;
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.image.width / this.maxFrames,
            0, this.image.width / this.maxFrames, this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.maxFrames * this.scale,
            this.image.height * this.scale
        );
    }

    update() {
        this.draw();
        this.elapsedFrames++;
        if (this.elapsedFrames % this.holdFrames !== 0) {
            return;
        }
        if (this.currentFrame < this.maxFrames - 1) {
            this.currentFrame++
        } else {
            this.currentFrame = 0;
        }

    }
}