/*Notes for Clara canvas.width = 505; canvas.height = 606; within Engine.engine.js - all math code within Alaria Code is Craigs with very minimal adjustments if any*/

//Udacity provided Code Start ******************************************************************************************************************************

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

//Alaria Code Start*****

    this.sprite = "images/enemy-bug.png"; //Alara:  Wouldn't CSS Image sprites load faster? http://www.w3schools.com/css/css_image_sprites.asp not that speed is an issue..yet...
    this.x = -101;  //Alaria: delcares x axis location for bug
    this.y = Math.floor(Math.random() * 3) * 83 + 60; //Alaria: delcares y axis location for bug Equation from Craig Hunter and http://www.w3schools.com/jsref/jsref_random.asp & http://www.w3schools.com/jsref/jsref_floor.asp
    this.speed = Math.floor(Math.random() * 400) + 50; //Alaria: delcares how fast the bugs will move

//Alaria Code End*****

}


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

//Alaria Code Start*****

    this.x += this.speed * dt;                              //Alaria: sets the speed using the dt parameter
    if (this.x > 505) {                                     //Alaria: if x axis is greater than 505 pixels
        this.x = -101;                                      //Alaria: the bug will start off screen on the x axis
        this.y = Math.floor(Math.random() * 3) * 83 + 60;   //Alaria: at a random y axis rounded down but within the limits of the block borders
        this.speed = Math.floor(Math.random() * 400) + 50; //Alaria: at random speeds rounded down - which leads to overlapping bugs but I'm ok with that.  Above Y axis random may be adjusted in teh future to prevent overlaps.

    }

//add a limit to RNG http://codereview.stackexchange.com/questions/62018/prevent-repetitive-random-numbers in teh future. This may help limit overlapping bigs.
    
    var collision = Math.abs(player.x - this.x);            //Alaria: when the images share the same absolute value x axis *The abs() method returns the absolute value of a number. http://www.w3schools.com/jsref/jsref_abs.asp
    if (collision < 50.5 && this.y === player.y + 18.5) {   //Alaria: a collision is when both images points have the same y axis
        player.y = 373.5;                                   //Alaria: player y axis jumps to 373.5 pixels
        player.loses += 1;                                  //Alaria: loss score gets +1
        player.score = player.wins - player.loses;          //Alaria: total score is wins minus loses (or bugs win).  Doesn't affect anything at the moment...that I can tell.
        console.log("Bug point +1!");
        document.getElementById("loses").innerHTML = player.loses; //Alaria: loss count aka bug win
    }
};

//Alaria Code End*****


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Alaria Code Start***** 

var Player = function () {
    this.sprite = "images/char-cat-girl.png"; // <reference path="../images/char-cat-girl.png" /> Note to self, Javascript doesn't want trailing periods. ALso, to change the character, change the file target in engine.js row 175 too.
    this.x = 202; //This places the playable character at the X axis we want (middle of the middle block).  X axis is horizontal
    this.y = 373.5; // This places the playable character in the bottom row middle block and compensates for the 3d shadow effect on the images. Y axis is vertical
    this.score = 0; //This would be a total score but I'm not quite there so it doesn't do much yet.
    this.wins = 0; //Players Wins
    this.loses = 0; //Bugs Wins
}

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//shake Screen code start http://www.javascriptsource.com/image-effects/shake-screen.html (future...doesn't work yet and haven't figured out why)
/*
function shake(n) {
if (parent.moveBy) {
for (i = 10; i > 0; i--) {
for (j = n; j > 0; j--) {
parent.moveBy(0,i);
parent.moveBy(i,0);
parent.moveBy(0,-i);
parent.moveBy(-i,0);
         }
      }
   }
}
*/
//Shake Screen code end


Player.prototype.handleInput = function (keyPress) { // shake image http://dynamicdrive.com/dynamicindex4/shake.htm or http://www.w3schools.com/jquery/eff_animate.asp 
    switch (keyPress) {
        case "left":
            if (this.x > 0) {
                this.x -= 101
            } else {
                console.log("Cannot move left offscreen");
            }
            break;

        case "right":
            if (this.x < 404) {
                this.x += 101
            } else {
                console.log("Cannot move right offscreen");
            }
            break;

        case "down":
            if (this.y < 373) {
                this.y += 83
            } else {
                console.log("Cannot descend offscreen");
            }
            break;

        case "up":
            if (this.y > 123) {
                this.y -= 83
            } else if (this.y < 42) {
                this.wins += 1;
                this.y = 373.5;
                console.log("Player Point +1!");
                document.getElementById("wins").innerHTML = this.wins;
            }
            break;

    }
};

           
//Alaria Code End*****



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Alaria Code Start***** With a huge help from Craig since my array wasn't a calculation originally and he explained the i representaion of integer and pushing the enemy into the array.

allEnemies = [];
for (i = 0; i < 3; i++) {

    allEnemies.push(new Enemy())
};
player =  new Player();

//Alaria Code End*****



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


//Udacity Provided Code End******************************************************************************************************************************