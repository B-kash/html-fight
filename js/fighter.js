class Fighter {
    constructor({
                    position,
                    velocity,
                    height,
                    width,
                    color = 'red',
                    offset
                }) {
        this.position = position;
        this.velocity = velocity;
        this.height = height;
        this.width = width;
        this.lastKeyPressed = '';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            height: 50,
            width: 100,
            offset
        }
        this.color = color
        this.isAttacking = false;
        this.health = 100;
        this.damage = 20;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

        //    Draw attack box
        if (this.isAttacking) {
            ctx.fillStyle = 'green';
            ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }

    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.isOnGround()) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += GRAVITY;
        }
    }

    isOnGround() {
        return this.position.y + this.height + this.velocity.y >= canvas.height - 96;
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}