/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * enemySaucers are bad guys that try to kidnap the humans and return them to the mother ship
 *
 * @class Game.EnemySaucer
 * @extends Phaser.Sprite
 * @param game Reference to the current running game
 * @param level Reference to the current running level
 */

(function() {

    //Load the image into the current game
    Game.preloadItems.push({ type: "image", name: "enemySaucer", path: "assets/images/enemySaucer.png" });
    Game.preloadItems.push({ type: "jsonHash", name: "alienSaucer", image: "assets/images/alienSaucer.png", jsonData: "assets/images/alienSaucer.json" });

    Game.EnemySaucer = function(level, attributes) {

        /**
         * A reference to the currently running level.
         * 
         * @property level
         * @type {Object}
         */

        this.level = level;

        /**
         * The amount of damage this enemy ship does if it hits something
         * 
         * @property damageRate
         * @type {Number}
         */

        this.damageRate = 10;

        /**
         * The idle state of the enemy ship
         * 
         * @property whatDoIDo
         * @type {Object}
         */

        this.whatDoIDo = new Game.EnemySaucer.Idle(this);

        /**
         * The chase human state of the enemy ship
         * If there a human that does not have a UFO assigned to it, then the UFO will go after it.
         *
         * @property chaseHuman
         * @type {Object}
         */

        this.chaseHuman = new Game.EnemySaucer.ChaseHuman(this);

        /**
         * The chase rocket state of the enemy ship
         * If all trhe humans have an enemy ship assigned to them, then the ship chases the rocket
         *
         * @property chaseRocket
         * @type {Object}
         */

        this.chaseRocket = new Game.EnemySaucer.ChaseRocket(this);

        /**
         * The return to mother ship state of the enemy ship
         * Once the enemy ship has captured a human, it returns to the mother ship
         *
         * @property backToMother
         * @type {Object}
         */

        this.backToMother = new Game.EnemySaucer.BackToMother(this);

        /**
         * Holds the current state of the enemy ship
         *
         * @property currentState
         * @type {Object}
         */

        this.currentState = this.whatDoIDo;

        /**
         * Holds the reference to the rocket
         *
         * @property rocket
         * @type {Phaser.Sprite}
         */

        this.rocket = null;

        /**
         * Does the enemy ship have a human
         * true = this ship has a captured human
         *
         * @property hasHuman
         * @type {bool}
         */

        this.hasHuman = false;

        /**
         * Reference to the human assigned to this enemy ship
         *
         * @property myHuman
         * @type {Phaser.Sprite}
         */

        this.myHuman = null;

        /**
         * Atributes for this character to work
         * These come from the level JSON file and are passed here when the object gets created
         *
         * @property attributes
         * @type Object
         */

        this.attributes = attributes;

        /**
         * Reference to the human assigned to this enemy ship
         *
         * @property myHuman
         * @type {Phaser.Sprite}
         */

        this.myHuman = null;

        Phaser.Sprite.call(this, this.level.game, this.level.mothership.x, this.level.mothership.y, 'alienSaucer');
        this.anchor.setTo(0.5, 0.5);
        this.name = "enemySaucer";

        //just for testing
        this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.frame = 0;

        this.span = (550 - this.level.mothership.y) / 21;

    };

    Game.EnemySaucer.prototype = Object.create(Phaser.Sprite.prototype);
    Game.EnemySaucer.prototype.constructor = Game.EnemySaucer;

    /**
     * Update loop for the enemy ship  
     *
     * @method update
     */

    Game.EnemySaucer.prototype.update = function() {

        //controls which frame to move the spritesheet to;
        var f = (Math.floor(this.y / this.span));

        //If f is larger than the max frame, change it to the max frame
        if (f > 20) {
            f = 20;
        }

        //set the frame
        this.frame = f;

        //Calls the update loop for the currentState
        this.currentState.update();


    };

    /**
     * set the damage rate of this weapon
     *
     * @method getDamageRate
     */

    Game.EnemySaucer.prototype.getDamageRate = function() {
        return this.damageRate;
    };

    /**
     * Tell this enemy ship which human to chase human  
     *
     * @method setHuman
     * @param {human} Reference to the human to chase
     */

    Game.EnemySaucer.prototype.setHuman = function(human) {
        this.myHuman = human;
    };

    /**
     * Send a reference to the rocket to this enemy ship  
     *
     * @method setHero
     */

    Game.EnemySaucer.prototype.setHero = function() {
        this.rocket = this.level.rocket;
    };

    /**
     * Set the current state of this enemy ship  
     *
     * @method setCurrentState
     * @param {state} Reference to the human to chase
     */

    Game.EnemySaucer.prototype.setCurrentState = function(state) {
        this.currentState = this[state];
    };

    /**
     * Set the name of this enemy ship  
     *
     * @method setName
     * @param {name} String vaule of the name
     */

    Game.EnemySaucer.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Switch the bool value  
     *
     * @method switchHasHuman
     */

    Game.EnemySaucer.prototype.switchHasHuman = function() {
        this.hasHuman = !this.hasHuman;
    };

    /**
     * Reset all the enemies ships vars back to their default values  
     *
     * @method clean
     */

    Game.EnemySaucer.prototype.clean = function() {
        this.hasHuman = false;
        this.rocket = null;
        this.myHuman = null;
    };

    /**
     * Called when the enemy ship is created or revived  
     * this assigns the enemy ship to capture a human or if all humans are being chased go after the rocket
     *
     * @method onCreate
     */

    Game.EnemySaucer.prototype.onCreate = function() {
        //If there are no humans to take, then the new UFO will chase the hero
        chaseRocket = true;
        //Loop thru the friends
        for (count = 0; count < this.level.friendGroup.length; count++) {

            //Check if the human already has a UFO assigned to it (null = no UFO assigned)
            if (this.level.friendGroup.getAt(count).ufo === null) {
                //Tell the UFO which human to go after
                this.setHuman(this.level.friendGroup.getAt(count));
                //Tell the human which UFO is chasing him
                this.level.friendGroup.getAt(count).setUFO(this);
                //Set the UFOs update state to chase the human
                this.setCurrentState("chaseHuman");
                //Set chaseRocket to false, so that the UFO goes after the human
                chaseRocket = false;
                //Break out of the loop
                break;
            }

        }

        //If all the humans already have a UFO assigned to them
        if (chaseRocket) {
            //Tell the UFO where the hero is
            this.setHero();
            //Set the UFOs update state to chase the hero
            this.setCurrentState("chaseRocket");
        }

    };

    /**
     * Called when the enemy ship is hit by a weapon  
     *
     * @method onHit
     */

    Game.EnemySaucer.prototype.onHit = function(damage) {
        this.damage(damage);

        //If the hit causes the death of the enemy
        if (!this.alive) {
            //If the UFO is targeting a human
            if (this.myHuman !== null) {
                //Sllow the human to fall back to earth
                this.myHuman.setCurrentState("humanFall");
                //remove the UFO from the human (the humans object is stored in the "myHuman" var in the UFOs object)
                this.myHuman.ufo = null;
            }

            //remove the human if there is one
            this.clean();
            this.setCurrentState("whatDoIDo");

            //IF the user kills the amount of UFOs that are created, then increase the UFOs speed
            if (this.level.UFOkillCount < this.level.numOfEnemies) {
                this.level.UFOkillCount++;
            } else {
                this.level.UFOkillCount = 0;
                this.level.UFOSpeed = (this.attributes.speed * this.attributes.speedIncrease);
            }

            //Add one to the score of the game
            this.level.score++;

            //Update the game interfaces score text
            this.level.gameInterface.setScoreMessage(this.level.score);
        }

    };

})();