/*Notes for Clara canvas.width = 505; canvas.height = 606; within Engine.engine.js - all math code within Alaria Code is Craigs*/

//Udacity provided Code Start ******************************************************************************************************************************

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

//Alaria Code Start*****

    this.sprite = "images/enemy-bug.png"; //Alara:  Wouldn't CSS Image sprites load faster? http://www.w3schools.com/css/css_image_sprites.asp
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
        this.x = -101;                                      //Alaria: the bug will start off screen
        this.y = Math.floor(Math.random() * 3) * 83 + 60;   //Alaria: at a random y axis rounded down
        this.speed = Math.floor(Math.random() * 400) + 50; //Alaria: at random speeds rounded down

    }
    
    var collision = Math.abs(player.x - this.x);            //Alaria: when the images share the same absolute value x axis *The abs() method returns the absolute value of a number. http://www.w3schools.com/jsref/jsref_abs.asp
    if (collision < 50.5 && this.y === player.y + 18.5) {   //Alaria: a collision is when both images have the same y axis
        player.y = 373.5;                                   //Alaria: player y axis jumps to 373.5 pixels
        player.loses += 1;                                  //Alaria: loss score gets +1
        player.score = player.wins - player.loses;          //Alaria: total score is wins minus loses
        document.getElementById("loses").innerHTML = player.loses; //Alaria: loss count
        document.getElementById("total").innerHTML = player.score; //Alaria: total score
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
    this.sprite = "images/char-cat-girl.png"; /// <reference path="../images/char-cat-girl.png" />
    this.x = 202;
    this.y = 373.5;
    this.score = 0;
    this.wins = 0;
    this.loses = 0;
}

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case "left":
            if (this.x > 0) {
                this.x -= 101
            } else {
                console.log("Cannot move offscreen");
            }
            break;

        case "right":
            if (this.x < 404) {
                this.x += 101
            } else {
                console.log("Cannot move offscreen");
            }
            break;

        case "down":
            if (this.y < 373) {
                this.y += 83
            } else {
                console.log("Cannot move offscreen");
            }
            break;

        case "up":
            if (this.y > 123) {
                this.y -= 83
            } else if (this.y < 42) {
                this.wins += 1;
                this.score = this.wins - this.losses;
                console.log("You Win! \n Wins: " + this.wins + "\n Loses: " + this.loses + "\n Score: " + this.score);
                this.y = 373.5;
                document.getElementById("wins").innerHTML = this.wins;
                document.getElementById("total").innerHTML = this.score;
            }
            break;

    }
};

           
//Alaria Code End*****



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Alaria Code Start*****

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

/*

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';  //Alara:  Wouldn't CSS Image sprites load faster? http://www.w3schools.com/css/css_image_sprites.asp

    this.x = -101;  //Alaria: delcares x axis location for bug
    this.y = Math.floor(Math.random() * 3) * 83 + 60; //Alaria: delcares y axis location for bug
    this.speed = Math.floor(Math.random() * 400) + 50; //Alaria: delcares how fast the bugs will move
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function (dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;                              //Alaria: sets the speed using the dt parameter
    if (this.x > 505) {                                     //Alaria: if x axis is greater than 505 pixels
        this.x = -101;                                      //Alaria: the bug will start off screen
        this.y = Math.floor(Math.random() * 3) * 83 + 60;   //Alaria: at a random y axis
        this.speed = Math.floor(Math.randomm() * 400) + 50; //Alaria: at random speeds
    }

    var collision = Math.abs(player.x - this.x);            //Alaria: when the images share the same absolute value x axis *The abs() method returns the absolute value of a number. http://www.w3schools.com/jsref/jsref_abs.asp
    if (collision < 50.5 && this.y === player.y + 18.5) {   //Alaria: a collision is when both images have the same y axis
        player.y = 373.5;                                   //Alaria: player y axis jumps to 373.5 pixels
//        player.loses += 1;                                  //Alaria: loss score gets +1
//        player.score = player.wins - player.loses;          //Alaria: total score is wins minus loses
//        document.getElementById("loses").innerHTML = player.loses; //Alaria: loss count
//        document.getElementById("total").innerHTML = player.score; //Alaria: total score
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.sprite = "/images/char-cat-girl.png";
    this.x = 202;
    this.y = 373.5;
//    this.score = 0;
//    this.wins = 0;
//    this.loses = 0;
};

Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    switch(keyPress) {
        case "left":
            if (this.x > 0) {
                this.x -= 101;
            } else {
                console.log("Cannot move offfscreen");
            }
            break;

        case "right":
            if (this.x < 404) {
                this.x += 101;
            } else {
                console.log("Cannot move offscreen");
            }
            break;

        case "down":
            if (this.y < 373) {
                this.y += 83;
            } else {
                console.log("Cannot move offscreen");
            }
            break;

        case "up":
            if (this.y > 123) {
                this.y -= 83;
            } //else if (this.y < 42) {
//                this.wins +=1;
//                this.score = this.wins - this.losses;
//                console.log("You Win! \n Wins: " + this.wins + "\n Loses: " + this.loses + "\n Score: " + this.score);
//                this.y = 373.5;
//                document.getElementById("wins").innerHTML = this.wins;
//                document.getElementById("total").innerHTML = this.score;
//            }
            break;
        
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

*/