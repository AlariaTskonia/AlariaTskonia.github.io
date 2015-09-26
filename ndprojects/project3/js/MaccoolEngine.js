/* Engine.js
* This file provides the game loop functionality (update entities and render),
* draws the initial game board on the screen, and then calls the update and
* render methods on your player and enemy objects (defined in your app.js).
*
* A game engine works by drawing the entire game screen over and over, kind of
* like a flipbook you may have created as a kid. When your player moves across
* the screen, it may look like just that image/character is moving or being
* drawn but that is not the case. What's really happening is the entire "scene"
* is being drawn over and over, presenting the illusion of animation.
*
* This engine is available globally via the Engine variable and it also makes
* the canvas' context (ctx) object globally available to make writing app.js
* a little simpler to work with.
*/
var Engine = (function (global) {
    /* Predefine the variables we'll be using within this scope,
    * create the canvas element, grab the 2D context for that canvas
    * set the canvas elements height/width and add it to the DOM.
    */
    var doc = global.document,
win = global.window,
canvas = doc.createElement('canvas'),
ctx = canvas.getContext('2d'),
lastTime;
    canvas.width = 606;
    canvas.height = 606;
    doc.body.appendChild(canvas);
    /* This function serves as the kickoff point for the game loop itself
    * and handles properly calling the update and render methods.
    */
    function main() {
        /* Get our time delta information which is required if your game
        * requires smooth animation. Because everyone's computer processes
        * instructions at different speeds we need a constant value that
        * would be the same for everyone (regardless of how fast their
        * computer is) - hurray time!
        */
        var now = Date.now(),
dt = (now - lastTime) / 1000.0;
        /* Call our update/render functions, pass along the time delta to
        * our update function since it may be used for smooth animation.
        */
        update(dt);
        render();
        /* Set our lastTime variable which is used to determine the time delta
        * for the next time this function is called.
        */
        lastTime = now;
        /* Use the browser's requestAnimationFrame function to call this
        * function again as soon as the browser is able to draw another frame.
        */
        win.requestAnimationFrame(main);
    }
    /* This function does some initial setup that should only occur once,
    * particularly setting the lastTime variable that is required for the
    * game loop.
    */
    function init() {
        reset();
        playersprite = new PlayerSprite;
        lastTime = Date.now();
        main();
    }
    /* This function is called by main (our game loop) and itself calls all
    * of the functions which may need to update entity's data. Based on how
    * you implement your collision detection (when two entities occupy the
    * same space, for instance when your character should die), you may find
    * the need to add an additional function call here. For now, we've left
    * it commented out - you may or may not want to implement this
    * functionality this way (you could just implement collision detection
    * on the entities themselves within your app.js file).
    */
    function update(dt) {
        updateEntities(dt);
    }
    /* This is called by the update function and loops through all of the
    * objects within your allEnemies array as defined in app.js and calls
    * their update() methods. It will then call the update function for your
    * player object. These update methods should focus purely on updating
    * the data/properties related to the object. Do your drawing in your
    * render methods.
    */
    function updateEntities(dt) {
        if (gameSet === 1) {
            allEnemies.forEach(function (enemy) {
                enemy.update(dt);
            });
            player.update();
        }
    }
    /* This function initially draws the "game level", it will then call
    * the renderEntities function. Remember, this function is called every
    * game tick (or loop of the game engine) because that's how games work -
    * they are flipbooks creating the illusion of animation but in reality
    * they are just drawing the entire screen over and over.
    */
    function render() {
        /* This array holds the relative URL to the image used
        * for that particular row of the game level.
        */
        // Render the game proper when gameSet is 1, if 0 render loadscreen, 2 render close screen
        switch (gameSet) {
            case 0: //load screen
                renderGameSelections();
                break;
            case 1: // play game
                // Clear the whole canvas first - mainly required if player icon goes outside the board
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                var rowImages = [
'images/stone-block.png', // Top row is water
'images/water-block.png', // Row 1 of 3 of stone
'images/water-block.png', // Row 2 of 3 of stone
'images/water-block.png', // Row 3 of 3 of stone
'images/water-block.png', // Row 1 of 2 of grass
'images/grass-block.png' // Row 2 of 2 of grass
],
numRows = 6,
numCols = 6,
row, col;
                /* Loop through the number of rows and columns we've defined above
                * and, using the rowImages array, draw the correct image for that
                * portion of the "grid"
                */
                for (row = 0; row < numRows; row++) {
                    for (col = 0; col < numCols; col++) {
                        /* The drawImage function of the canvas' context element
                        * requires 3 parameters: the image to draw, the x coordinate
                        * to start drawing and the y coordinate to start drawing.
                        * We're using our Resources helpers to refer to our images
                        * so that we get the benefits of caching these images, since
                        * we're using them over and over.
                        */
                        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
                    }
                }
                // Render the score panel at the bottom of the screen
                renderScorePanel();
                // Render player and enemies
                renderEntities();
                break;
            case 2: //close screen
                renderCloseScreen();
                break;
        }
    }
    /* This function is called by the render function and is called on each game
    * tick. It's purpose is to then call the render functions you have defined
    * on your enemy and player entities within app.js
    */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
        * the render function you have defined.
        */
        allEnemies.forEach(function (enemy) {
            enemy.render();
        });
        player.render();
    }
    // The function renders the game selections screen
    function renderGameSelections() {
        // Title
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Title
        ctx.fillStyle = 'green';
        ctx.font = 'bold 18pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('MACCOOL FROGGER', 352, 21);
        //Sprite selection text
        ctx.fillStyle = 'green';
        ctx.font = 'bold 16pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Please choose your player', 352, 101);
        ctx.fillText('Use left and right arrows to highlight player', 352, 121);
        ctx.fillText('Press \'1\' to commit selection', 352, 141);
        // Render the sprite selector
        playersprite.render();
        // Draw the sprite selections
        ctx.drawImage(Resources.get('images/char-cat-girl.png'), 101, 101);
        ctx.drawImage(Resources.get('images/char-horn-girl.png'), 201, 101);
        ctx.drawImage(Resources.get('images/char-pink-girl.png'), 301, 101);
        ctx.drawImage(Resources.get('images/char-princess-girl.png'), 401, 101);
        ctx.drawImage(Resources.get('images/char-boy.png'), 501, 101);
        // Draw the difficulty text
        ctx.fillStyle = 'green';
        ctx.font = 'bold 16pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Please choose your difficulty', 332, 311);
        ctx.fillText('Use left and right arrows to highlight difficulty', 352, 331);
        ctx.fillText('Press \'2\' to commit selection', 352, 351);
        // Draw the difficulty images and number for difficulty
        ctx.fillStyle = 'white';
        ctx.font = 'bold 42pt Arial';
        ctx.textAlign = 'center';
        ctx.drawImage(Resources.get('images/Gem Green.png'), 101, 301);
        ctx.fillText('1', 151, 421);
        ctx.drawImage(Resources.get('images/Gem Green.png'), 201, 301);
        ctx.fillText('2', 251, 421);
        ctx.drawImage(Resources.get('images/Gem Green.png'), 301, 301);
        ctx.fillText('3', 351, 421);
        ctx.drawImage(Resources.get('images/Gem Green.png'), 401, 301);
        ctx.fillText('4', 451, 421);
        ctx.drawImage(Resources.get('images/Gem Green.png'), 501, 301);
        ctx.fillText('5', 551, 421);
        // Final text
        ctx.fillStyle = 'green';
        ctx.font = 'bold 17pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS ENTER WHEN YOU HAVE SELECTED', 353, 511);
    }
    // This function renders the end screen
    function renderCloseScreen() {
        // Clear the screen
        ctx.clearRect(0, 0, cWidth, cHeight + 100);
        ctx.fillStyle = 'green';
        ctx.font = 'bold 28pt Arial';
        ctx.textAlign = 'center';
        // Title, score and replay
        ctx.fillText('MACCOOL FROGGER', 352, 51);
        ctx.fillText('FINAL SCORE: ', 303, 201);
        ctx.fillText(player.score, 503, 201);
        ctx.fillText('THANK YOU FOR PLAYING', 353, 401);
        ctx.font = 'bold 20pt Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('TO PLAY AGAIN PLEASE PRESS 9', 353, 501);
    }
    // This function renders the bottom panel for scoring and lives purposes
    //
    function renderScorePanel() {
        //Outline of the scoring panel
        ctx.beginPath();
        ctx.rect(0, canvas.height - 50, canvas.width, 30);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'green';
        ctx.stroke();
        //Score
        ctx.fillStyle = 'green';
        ctx.font = 'bold 14pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('SCORE:', 45, canvas.height - 28);
        //Crossing multiplier
        ctx.fillStyle = 'green';
        ctx.font = 'bold 14pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CROSSINGS:', 255, canvas.height - 28);
        //Lives
        ctx.fillStyle = 'green';
        ctx.font = 'bold 14pt Arial';
        ctx.textAlign = 'center';
        ctx.fillText('LIVES:', 475, canvas.height - 28);
        var xCoord = 506;
        for (j = 1; j <= tLives; j++) {
            ctx.drawImage(Resources.get('images/Star-small.png'), xCoord, cHeight - 55);
            xCoord = xCoord + 20;
        }
    }
    /* This function does nothing but it could have been a good place to
    * handle game reset states - maybe a new game menu or a game over screen
    * those sorts of things. It's only called once by the init() method.
    */
    function reset() {
        // This sets up the game for first time use
        gameStartup();
    }
    /* Go ahead and load all of the images we know we're going to need to
    * draw our game level. Then set init as the callback method, so that when
    * all of these images are properly loaded our game will start.
    */
    Resources.load([
'images/stone-block.png',
'images/water-block.png',
'images/grass-block.png',
'images/enemy-bug-red.png',
'images/enemy-bug-blue.png',
'images/enemy-bug-green.png',
'images/char-boy.png',
'images/rock.png',
'images/Star-small.png',
'images/Star.png',
'images/Star-small-crossed.png',
'images/Selector.png',
'images/char-cat-girl.png',
'images/char-horn-girl.png',
'images/char-pink-girl.png',
'images/char-princess-girl.png',
'images/Gem Green.png'
]);
    Resources.onReady(init);
    /* Assign the canvas' context object to the global variable (the window
    * object when run in a browser) so that developer's can use it more easily
    * from within their app.js files.
    */
    global.ctx = ctx;
})(this);