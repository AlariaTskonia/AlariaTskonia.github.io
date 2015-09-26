//Global variables and constants
var cHeight = 606; // Canvas height
var cWidth = 606; // Canvas width
var nRows = 6; // No. of rows on canvas
var nCols = 6; // No. of cols on canvas
var rowHeight = cHeight / nRows; // Height of each row
var colWidth = cWidth / nCols; // Width of each col
var eRowStarts = [61, 145, 228, 310]; // Pixel y coord enemy starting points for each row of water
var eOffStart = [-101, -202, -303, -404]; // Off screen coords for enemy starting positions
var speedMove = 2; // Default speed of movement of player, lower the number the faster the speed
var minX = 0; // Min X coord allowed for player
var maxX = colWidth * (nCols - 1); // MaX X coord allowed for player
var minY = -5 * speedMove; // Min Y coord allowed for player
var maxY = rowHeight * (nRows - 2); // Min Y coord allowed for player
var eSpeed = 100; // The speed of the enemies default number
var eQuantity = 5; // The number of enemies default number
var ePngHeight = 171; // The height of the enemy png for collision purposes
var ePngWidth = 101; // The width of the enemy png for collision purposes
var eRightPad = 101; // Pixels to the actual right hand side of the enemy in the png for collision purposes
var eBottomPad = 27; // Pixels at the bottom of enemy bug that is blank for collision purposes
var eTopPad = 93; // Pixels from bottom to top of enemy bug that is blank for collision purposes
var pColMove = cWidth / nCols; // Amount player moves left and right
var pRowMove = 83; // Amount player moves top and bottom
var pPngHeight = 171; // The height of the player png for collision purposes
var pPngWidth = 101; // The width of the player png for collision purposes
var pRightPad = 82; // Pixels to the actual right hand side of the player in the png for collision purposes
var pBottomPad = 34; // Pixels at the bottom of player that is blank for collision purposes
var pTopPad = 107; // Pixels from bottom to top of player that is blank for collision purposes
var chosenSprite = ''; // Sprite chosen for player
var xPlayerStart = colWidth * 2; // x coord starting pos for Player
var yPlayerStart = rowHeight * 4; // y coord starting pos for Player
var overlap = false; // Boolean check on a collision
var tLives = 5; // Maximum number of lives
var resetCrossed = 0; // A reset variable to make sure crossings are only counted once
var moveScore = 1; // Base score for every positive move by the player, changes with game difficulty
var gameSet = 0; // 0=load screen, 1=playing game, 2=close screen
var spriteCoord = 101; // Default x coord for selecting a sprite on the selection screen
var difficultyCoord = 101; // Default x coord for selecting a difficulty on the selection screen
var difficultySetting = 1; // Default difficulty setting
// Enemies classes and other functions started -------------------------------------------------------------------------------------------
// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Uses a random generator of 3 different coloured enemies
    var rndEnemy = Math.floor((Math.random() * 3)) + 1;
    switch (true) {
        case (rndEnemy === 1):
            this.sprite = 'images/enemy-bug-red.png';
            break;
        case (rndEnemy === 2):
            this.sprite = 'images/enemy-bug-blue.png';
            break;
        case (rndEnemy === 3):
            this.sprite = 'images/enemy-bug-green.png';
            break;
    }
    // Get a random row for the enemy to start on
    this.y = eRowStarts[Math.floor((Math.random() * 4))];
    // Get a random off screen position so they appear in diff. places
    this.x = eOffStart[Math.floor((Math.random() * eOffStart.length))];
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Only render the enemy if it's still within the board
    // If not set it back to the beginning
    if (this.x <= ctx.canvas.width) {
        // Change the position based on the speed of the enemies
        this.x = this.x + (eSpeed * dt);
    } else {
        // Set x back off screen to the left and randomise the row it appears on
        this.x = eOffStart[Math.floor((Math.random() * eOffStart.length))];
        this.y = eRowStarts[Math.floor((Math.random() * 4))];
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function (enemy) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies classes and other functions finished -------------------------------------------------------------------------------------------
// Players classes and other functions starts ---------------------------------------------------------------------------------------------
var Player = function () {
    // Set image and position
    this.sprite = chosenSprite; // Sprite chosen from selection screen
    this.x = xPlayerStart;
    this.y = yPlayerStart;
    this.keyPress = '';
    // Set game score details
    this.crossings = 0;
    this.lives = 5;
    this.score = 0;
};
// Update the player sprite position and details
Player.prototype.update = function () {
    // Now check the player movement and set the position of player
    // Check current x and y against the min and max settings
    switch (this.keyPress) {
        case 'up':
            if (this.y > minY) {
                this.y = this.y - (pRowMove / speedMove);
            }
            break;
        case 'down':
            if (this.y < maxY) {
                this.y = this.y + (pRowMove / speedMove);
            }
            break;
        case 'left':
            if (this.x > minX) {
                this.x = this.x - (pColMove / speedMove);
            }
            break;
        case 'right':
            if (this.x < maxX) {
                this.x = this.x + (pColMove / speedMove);
            }
            break;
    }
    // Key pressed so we can increment player score because they made a move
    // You should only score if you are moving forward/backward
    // And if you are moving left or right in the enemy zone
    // Base score multiplies by number of crossings
    // If you make a successful crossing then the multiplier should increase by 1
    switch (this.keyPress) {
        case 'up':
        case 'down':
            if (this.y > 31 && this.y < 322) {
                this.score = this.score + (moveScore * (this.crossings + 1));
            }
            break;
        case 'right':
        case 'left':
            if (this.y > 31 && this.y < 322) {
                this.score = this.score + (moveScore * (this.crossings + 1));
            }
            break;
    }
    // Reset the keypress so the update doesn't keep moving the player
    this.keyPress = '';
};
//Render the player sprite on the board
Player.prototype.render = function () {
    // Draw the player sprite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // Check for collisions
    checkCollisions(player);
    // Check for a valid crossing
    checkCrossings(player);
};
// Receives the player keyboard inputs
Player.prototype.handleInput = function (keys) {
    // Work out the key press and set it for player update to process
    this.keyPress = keys;
    switch (keys) {
        case 'nine':
            gameSet = 0;
            break;
    }
};
// Checks whether the player sprite has overlapped with and enemy
// sprite. If it does it resets the player. If it does not score is
// added.
function checkCollisions(player) {
    //Get the current co-ords for the player sprite
    var pX = player.x, pY = player.y, eX = [], eY = [], i = 0, eObj = [];
    //Now get the co-ords for all the enemies
    for (i = 0; i <= eQuantity - 1; i = i + 1) {
        // Put each enemy into an object and collect x and y coords
        eObj = allEnemies[i];
        eX.push(eObj['x']);
        eY.push(eObj['y']);
    }
    // Now let's check for a collision
    // Get coords for the player sprite
    var pLeft = pX, pBottom = pY, eLeft = 0, eBottom = 0;
    // Loop round and get coords for each enemy sprite
    // and check them against the player sprite for collision
    for (i = 0; i <= eQuantity - 1; i = i + 1) {
        eLeft = eX[i];
        eBottom = eY[i];
        // If all these statements are true then there must be a collision
        if (eLeft < (pLeft + pRightPad) && // left of enemy right of player
(eLeft + eRightPad) > pLeft && // right of enemy left of player
(eBottom - eBottomPad) > (pBottom - pTopPad) && // bottom of enemy top of player
(eBottom - eTopPad) < (pBottom - pBottomPad)) { // top of enemy bottom of player
            // Collision detected
            overlap = true;
        }
        // If collision detected reset the sprite, crossings multiplier and start again
        if (overlap) {
            player.keyPress = '';
            // Sprite death sequence
            /*
            player.sprite = 'images/rock.png';
            ctx.drawImage(Resources.get(player.sprite), player.x, player.y);
            pauseGame(1000);
            */
            // There's a collision so decrease player lives by 1
            player.lives = player.lives - 1;
            // Have we run out of lives if so finish the game
            if (player.lives === 0) {
                pauseGame(1000);
                // Game has finished so draw end screen and start again
                gameSet = 2;
            } else {
                // Still have lives so just reset player position
                player.x = xPlayerStart;
                player.y = yPlayerStart;
            }
            // Reset crossings to zero because we have collided
            overlap = false;
            player.crossings = 0;
            /*if (player.crossings >= 0) {
            player.crossings = player.crossings -1;
            } else {
            player.crossings = 0;
            };*/
        } else {
            // No collision so scoring panel can be updated
            scoreUpdate(player);
        }
    }
}
// Checks for a valid crossing when the player has reached either safe zone.
function checkCrossings(player) {
    // Only mark a good crossing if the player has reached either safe zone.
    // resetCrossed makes sure that crossings aren't counted when just sitting
    // in the zone.
    switch (true) {
        // Top zone 
        case (player.y < 10):
            if (resetCrossed === 0) {
                player.crossings = player.crossings + 1;
                resetCrossed = 1;
            }
            break;
        // Bottom zone 
        case (player.y > 401):
            if (resetCrossed > 0) {
                player.crossings = player.crossings + 1;
                resetCrossed = 0;
            }
            break;
    }
}
// Players classes and other functions finished ----------------------------------------------------------------------------------------
// Instantiation ------------------------------------------------------------------------------------------------------------------------
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = Player(), allEnemies = [];
// Key press handler---------------------------------------------------------------------------------------------------------------------
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    //console.log(e.keyCode);
    var allowedKeys = {
        13: 'enter',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: 'one', // used for selection of sprite on load screen
        50: 'two', // used for selection of difficulty on load screen
        57: 'nine' // used for restart of the whole game
    };
    // If on the selector screen then handle sprite input
    // Else handle game play inputs
    if (gameSet === 0) {
        playersprite.handleInput(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
// Sprite selection classes and other functions started---------------------------------------------------------------------------------
// Sprite to be used as player
var PlayerSprite = function () {
    this.x = 101;
    this.y = 101;
    this.sprite = 'images/Selector.png';
    this.alpha = 1;
};
// Receives input from user to move selector
PlayerSprite.prototype.handleInput = function (key) {
    switch (key) {
        case 'left':
            if (this.x >= 201) {
                this.x = this.x - 100;
            }
            break;
        case 'right':
            if (this.x <= 401) {
                this.x = this.x + 100;
            }
            break;
        case 'down':
            // Only allow down press if on the player row
            if (this.y === 101) {
                this.y = this.y + 200;
            }
            break;
        case 'up':
            // Only allow down press if on the player row
            if (this.y === 301) {
                this.y = this.y - 200;
            }
            break;
        case 'one':
            spriteCoord = this.x;
            ctx.drawImage(Resources.get('images/Star.png'), this.x, 101);
            break;
        case 'two':
            difficultyCoord = this.x;
            ctx.drawImage(Resources.get('images/Star.png'), this.x, 101);
            break;
        case 'enter':
            // User happy with choices so commit them
            // Use the y coord to determine which sprite was chosen
            switch (spriteCoord) {
                case 101:
                    chosenSprite = 'images/char-cat-girl.png';
                    break;
                case 201:
                    chosenSprite = 'images/char-horn-girl.png';
                    break;
                case 301:
                    chosenSprite = 'images/char-pink-girl.png';
                    break;
                case 401:
                    chosenSprite = 'images/char-princess-girl.png';
                    break;
                case '501':
                    chosenSprite = 'images/char-boy.png';
                    break;
                default:
                    chosenSprite = 'images/char-boy.png';
                    break;
            }
            switch (difficultyCoord) {
                case 101:
                    difficultySetting = 1;
                    break;
                case 201:
                    difficultySetting = 2;
                    break;
                case 301:
                    difficultySetting = 3;
                    break;
                case 401:
                    difficultySetting = 4;
                    break;
                case '501':
                    difficultySetting = 5;
                    break;
                default:
                    chosenSprite = 'images/char-boy.png';
                    difficultySetting = 1;
                    break;
            }
            gameSet = 1;
            gameStartup();
            break;
    }
};
// Renderer for the sprite selection element of load screen
PlayerSprite.prototype.render = function () {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.restore();
};
// Sprite selection classes and other functions finished---------------------------------------------------------------------------------
// Supporting functions for the game ------------------------------------------------------------------------
// Sets the game up
function gameStartup() {
    var i = 0;
    allEnemies = [];
    player = new Player;
    overlap = false;
    player.lives = tLives;
    player.crossings = 0;
    // Now set the difficulty up based on selection
    switch (difficultyCoord) {
        case 101:
            speedMove = 1;
            eQuantity = 5;
            eSpeed = 100;
            break;
        case 201:
            speedMove = 1;
            eQuantity = 8;
            eSpeed = 200;
            break;
        case 301:
            speedMove = 2;
            eQuantity = 6;
            eSpeed = 250;
            break;
        case 401:
            speedMove = 2;
            eQuantity = 8;
            eSpeed = 250;
            break;
        case 501:
            speedMove = 3;
            eQuantity = 10;
            eSpeed = 300;
            break;
    }
    // Set the base score that gets used based on the difficulty choices
    // Based on speedMove (player speed 1 to 5), eSpeed (enemy speed 50 to 300), eQuantity (no. of enemies)
    moveScore = speedMove * (eSpeed / 50) * Math.floor(eQuantity / 2);
    for (i = 0; i <= eQuantity - 1; i = i + 1) {
        allEnemies.push(new Enemy);
    }
    checkEnemyStartingPositions();
}
// All enemies have been created time to check starting positions.
// I don't want any overlap. If they are reset an enemy starting position
function checkEnemyStartingPositions() {
    var eX = [], eY = [], eObj = [], i = 0, j = 0;
    // Put each enemy into an object and collect x and y coords
    for (i = 0; i <= eQuantity - 1; i = i + 1) {
        eObj = allEnemies[i];
        eX.push(eObj['x']);
        eY.push(eObj['y']);
    }
    // Now do the x starting position checking
    for (i = 0; i <= eQuantity - 1; i = i + 1) {
        for (j = 0; j <= eQuantity - 1; j = j + 1) {
            //Don't bother checking the same enemy
            if (i != j) {
                // First is this enemy on the same row?
                if (eY[i] === eY[j]) {
                    // Simply reset the
                    allEnemies[i]['x'] = allEnemies[i]['x'] + 101;
                }
            } // End if !i==j
        } // End for j loop
    } // End for i loop
}
// Creates a pause in the game to allow visuals to be shown
function pauseGame(ms) {
    ms += new Date().getTime();
    while (new Date() < ms) { }
}
// Draws the score during the game play
function scoreUpdate(player) {
    // Score draw
    ctx.fillStyle = 'green';
    ctx.font = 'bold 14pt Arial';
    ctx.textAlign = 'center';
    ctx.fillText(prefixZero(player.score, 6), 115, cHeight - 28);
    // Draw crossings
    // Crossings score has to be reduced by 1 as it starts at 1 to ensure the
    // score multiplier works
    ctx.fillStyle = 'green';
    ctx.font = 'bold 14pt Arial';
    ctx.textAlign = 'center';
    ctx.fillText(prefixZero(player.crossings, 3), 335, cHeight - 28);
    // Draw lives
    var xCoord = 506, j = 0;
    for (j = 1; j <= tLives; j = j + 1) {
        if (j <= player.lives) {
            ctx.drawImage(Resources.get('images/Star-small.png'), xCoord, cHeight - 55);
        } else {
            ctx.drawImage(Resources.get('images/Star-small-crossed.png'), xCoord, cHeight - 55);
        };
        xCoord = xCoord + 20;
    }
}
// Prefix the score with zeros so it looks like a proper score
function prefixZero(score, nZeros) {
    var newScore = score + "";
    while (newScore.length < nZeros) newScore = "0" + newScore;
    return newScore;
}
// Supporting functions to help the game: finish -----------------------------------------------------------------------