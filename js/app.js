'use strict';

// A superclass for enemies and player to inherit from. Common attributes
// and methods will live here.
var GamePiece = function (x, y) {
    // x and y are being stored as row, column, not actual pixel location
    // these values will be multiplied by 101 and 83 respectively to
    // determine actual drawing location
    this.x = x;
    this.y = y;
};

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //Create a new enemy in a random row of the three allowed
    GamePiece.call(this, 0, Math.round(Math.random() * 2) + 1);
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.round(Math.random() * 3) + 1;
};


// Update the element's position, required method for game
// Parameter: dt, a time delta between ticks
// This will update both players and enemies


Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;


Enemy.prototype.checkBounds = function () {
    if (this.x * 101 > 505) {
        this.x = 0;
        this.speed = Math.round(Math.random() * 3) + 1;
        this.y = Math.round((Math.random() * 2) + 1);
    }
};

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (1 * dt * this.speed);
    this.checkBounds();
};

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) - 20);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    GamePiece.call(this, 3, 5);  // always start player at bottom center
    this.sprite = 'images/char-boy.png';
    this.wins = false;
};


Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function (keycode) {
    switch (keycode) {
        case 'left':
            this.x--;
            break;
        case 'up':
            this.y--;
            break;
        case 'right':
            this.x++;
            break;
        case 'down':
            this.y++;
            break;
    }
};

Player.prototype.update = function (dt) {
    // Players move according to a keypress by the player, so
    // update does not need to move the player.
    this.checkBounds();
    this.checkCollisions();
};

Player.prototype.checkBounds = function () {
    //Players should be checked to see if they reached the water (WIN)
    //or one of the sides (if so, play a beep or something)

    if (this.x < 0) {
        this.x = 0;
    }
    if (this.x > 4) {
        this.x = 4;
    }
    if (this.y > 5) {
        this.y = 5;
    }
    if (this.y < 0) {
        this.y = 0;
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, (this.y * 83) -10 );
};

Player.prototype.checkCollisions = function() {
    //loop through all enemies to see if player overlaps and enemy
    for (var enemy in allEnemies) {
        // check for intersection of bounds of enemy and player
        if ((Math.round(allEnemies[enemy].x) == this.x) && (Math.round(allEnemies[enemy].y) == this.y)) {
            this.y = 5;
        }
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy()
];

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
