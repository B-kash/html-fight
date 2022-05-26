const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');

function setCanvasProperties() {
    canvas.width = 1024;
    canvas.height = 576;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setCanvasProperties();

const GRAVITY = 0.2;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png'
});
const shop = new Sprite({
    position: {
        x: 600,
        y: 128,
    },
    scale: 2.75,
    maxFrames: 6,
    holdFrames: 5,
    imageSrc: './img/shop.png'
});

const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 2,
    },
    height: 150,
    width: 50,
    offset: {
        x: 0,
        y: 0
    }
});
const enemy = new Fighter({
    position: {
        x: 500,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 2,
    },
    height: 150,
    width: 50,
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
});

const KEYS = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
}

function movePlayers(player, enemy) {
    player.velocity.x = 0;
    enemy.velocity.x = 0;
    if (KEYS.a.pressed && player.lastPressedKey === 'a') {
        player.velocity.x = -5;
    } else if (KEYS.d.pressed && player.lastPressedKey === 'd') {
        player.velocity.x = 5;
    }

    if (KEYS.ArrowLeft.pressed && enemy.lastPressedKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    } else if (KEYS.ArrowRight.pressed && enemy.lastPressedKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    }
}

let timer = 60;
let timerId;
function decreaseTimer() {
    if (timer > 0) {
        timer--;
        document.querySelector("#timer").innerHTML = timer.toString();
        timerId = setTimeout(decreaseTimer, 1000);
    }

    if (timer === 0) {
        determineWinner(player, enemy, timerId);

    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    shop.update();
    player.update();
    enemy.update();
    movePlayers(player, enemy);
    detectCollisionAndDetermineWinner(player, enemy, timerId);
}

animate();

function addEventListeners() {
    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'd':
                KEYS.d.pressed = true;
                player.lastPressedKey = 'd';
                break;
            case 'a':
                KEYS.a.pressed = true;
                player.lastPressedKey = 'a';
                break;
            case 'w':
                if (player.isOnGround()) {
                    player.velocity.y = -10;
                }
                player.lastPressedKey = 'w';
                break;
            case ' ':
                player.attack();
                break;


            //    ENEMY BEGINS HERE
            case 'ArrowLeft':
                KEYS.ArrowLeft.pressed = true;
                enemy.lastPressedKey = 'ArrowLeft';
                break;
            case 'ArrowRight':
                KEYS.ArrowRight.pressed = true;
                enemy.lastPressedKey = 'ArrowRight';
                break;
            case 'ArrowUp':
                if (enemy.isOnGround()) {
                    enemy.velocity.y = -10;
                }
                enemy.lastPressedKey = 'ArrowUp';
                break;
            case 'ArrowDown':
                enemy.attack();
                break;
        }
    });
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'd':
                KEYS.d.pressed = false;
                break;
            case 'a':
                KEYS.a.pressed = false;
                break;
            case 'w':
                KEYS.w.pressed = false;
                break;

            //    For Enemy
            case 'ArrowLeft':
                KEYS.ArrowLeft.pressed = false;
                break;
            case 'ArrowRight':
                KEYS.ArrowRight.pressed = false;
                break;
            case 'ArrowUp':
                KEYS.ArrowUp.pressed = false;
                break;

        }
    });
}

addEventListeners();