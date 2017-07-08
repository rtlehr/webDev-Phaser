/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Create a human in the game
 *
 * @class Game.Human
 * @extends Phaser.Sprite
 * @param {level} current running level
 * @param {orgX} the original X position of the human
 */

(function() {

    //Load the image for the human    
    Game.preloadItems.push({ type: "jsonHash", name: "humans", image: "assets/images/humans.png", jsonData: "assets/images/humans.json" });

    Game.Human = function(level, orgX) {

        /**
         * A reference to the currently level being run.
         * 
         * @property level
         * @type {Object}
         */

        this.level = level;

        /**
         * Holds the original X position of the human
         * 
         * @property orgX
         * @type {Number}
         */

        this.orgX = orgX;

        /**
         * The total range that the human can walk 
         * 
         * @property walkingRange
         * @type {Number}
         */

        this.walkingRange = 400;

        /**
         * Reference to the enemy ship that is chasing this human 
         * 
         * @property ufo
         * @type {Phaser.Sprite}
         */

        this.ufo = null;

        /**
         * State that gets called from the update function when the human is captured by an enemy ship 
         * 
         * @property humanCaptured
         * @type {Object}
         * @param {this} reference to this class
         */

        this.humanCaptured = new Game.Human.Captured(this);

        /**
         * State that gets called from the update function when the human is falling 
         * Happens if the human is captured and then the enemy ship is shot
         *
         * @property humanFall
         * @type {Object}
         * @param {this} reference to this class
         */

        this.humanFall = new Game.Human.Fall(this);

        /**
         * State that gets called from the update function when the human is walking 
         * 
         * @property humanWalking
         * @type {Object}
         * @param {this} reference to this class
         */

        this.humanWalking = new Game.Human.Walking(this);

        /**
         * The current state running 
         * 
         * @property currentState
         * @type {Object}
         * @default humanWalking
         */

        this.currentState = this.humanWalking;

        if (this.level.friendGroup.length > 0) {
            //Create the human sprite
            Phaser.Sprite.call(this, this.level.game, this.orgX, this.level.groundLevel, 'humans');
            //Our two animations, walking left and right.
            this.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 25, true);
            this.animations.add('captured', [0], 25, true);
        } else {
            //Create the human sprite
            Phaser.Sprite.call(this, this.level.game, this.orgX, this.level.groundLevel, 'humans');
            //Our two animations, walking left and right.
            this.animations.add('walk', [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 25, true);
            this.animations.add('captured', [20], 25, true);
        }

        this.anchor.setTo(0.5, 0);
        this.name = "human";

    };

    Game.Human.prototype = Object.create(Phaser.Sprite.prototype);
    Game.Human.prototype.constructor = Game.Human;

    /**
     * Update loop for the enemy ship  
     *
     * @method update
     */

    Game.Human.prototype.update = function() {
        this.currentState.update();
    };

    /**
     * Set the state to run in the update function  
     *
     * @method setCurrentState
     * @param {state} the statre to set as the current state
     */

    Game.Human.prototype.setCurrentState = function(state) {
        this.currentState = this[state];
    };

    /**
     * Set the name of the human sprite  
     *
     * @method setName
     * @param {name} the statre to set as the current state
     */

    Game.Human.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Set the orginal X position of the human sprite  
     *
     * @method setOrgX
     * @param {orgX} the statre to set as the current state
     */

    Game.Human.prototype.setOrgX = function(orgX) {
        this.orgX = orgX;
    };

    /**
     * Set the UFO that is chasing this human  
     *
     * @method setUFO
     * @param {ufo} Reference to the enemy ship chasing this human
     */

    Game.Human.prototype.setUFO = function(ufo) {
        this.ufo = ufo;
    };

})();