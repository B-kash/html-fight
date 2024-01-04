function detectRectangularCollision(rect1, rect2) {
    return checkXCollision(rect1, rect2) && checkYCollision(rect1, rect2);
}

function checkXCollision(rect1, rect2) {
    return rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x
        &&
        rect1.attackBox.position.x <= rect2.position.x + rect2.width;
}

function checkYCollision(rect1, rect2) {
    return rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y
        &&
        rect1.attackBox.position.y <= rect2.position.y + rect2.height;
}

function detectCollisionAndDetermineWinner(player, enemy, timerId) {
    if (detectRectangularCollision(player, enemy) && player.isAttacking) {
        player.isAttacking = false;
        enemy.health -= player.damage;
        document.querySelector("#enemyHealth").style.width = `${enemy.health}%`;
    }
    if (detectRectangularCollision(enemy, player) && enemy.isAttacking) {
        enemy.isAttacking = false;
        player.health -= enemy.damage;
        document.querySelector("#playerHealth").style.width = `${player.health}%`;
    }
    if (player.health <= 0 || enemy.health <= 0) {
        determineWinner(player, enemy, timerId);
    }
}
function determineWinner(player, enemy, timerId) {
    document.querySelector("#result").style.display = 'flex';
    if (player.health === enemy.health) {
        document.querySelector("#result").innerHTML = 'TIE';
    } else if (player.health > enemy.health) {
        document.querySelector("#result").innerHTML = 'Player 1 Wins';
    } else {
        document.querySelector("#result").innerHTML = 'Player 2 Wins';
    }
    clearTimeout(timerId);
}
function faceEnemy(player, enemy) {
    // if enemy is left of player and player and player attack box is facing right and enemy attack box is facing left
    if (enemy.position.x < player.position.x) {
        player.attackBox.offset.x = -50;
        enemy.attackBox.offset.x = 0;
    }
}