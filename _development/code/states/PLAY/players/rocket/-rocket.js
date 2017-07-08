/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds all of the code for code that is needed on each level
 *
 * @class Game.Rocket
 * @extends Phaser.Sprite
 * @param {game} Reference to the current running game
 * @param {gameInterface} Reference to the gameInterface class
 */

(function() {

    //Load the rocket image into the game
    Game.preloadItems.push({ type: "image", name: "rocket", path: "assets/images/rocketShip.png" });

    /**
     * Create the rocket
     *
     * @method Game.Rocket
     * @param {game} reference to the current game
     * @param {gameInterface} reference to the gameInterface class
     */

    Game.Rocket = function(level) {

        /**
         * A reference to the currently running game.
         * 
         * @property game
         * @type {Object}
         */

        this.level = level;

        /**
         * The amount od damage this weapon does
         * 
         * @property damageRate
         * @type {Number}
         */

        this.damageRate = null;

        /**
         * A reference to the gameInterface class
         * 
         * @property gameInterface
         * @type {Object}
         */

        this.gameInterface = this.level.gameInterface;

        Phaser.Sprite.call(this, this.level.game, 0, (this.level.game.world.height / 2) - 50, 'rocket');
        this.anchor.setTo(0.5, 0.5);
        this.name = "rocket";

    };

    Game.Rocket.prototype = Object.create(Phaser.Sprite.prototype);
    Game.Rocket.prototype.constructor = Game.Rocket;

    /**
     * Main update loop for the rocket
     *
     * @method update
     */

    Game.Rocket.prototype.update = function() {
        //get the horizontal value from the joystick (-1 to 1)
        var horzVal = this.gameInterface.getHorzVal();

        //get the verticle vaule from the joystick (-1 to 1)
        var vertVal = this.gameInterface.getVertVal();

        //flip the ship sprite depending on the direction (left or right) it is moving
        if (horzVal < 0) {
            this.scale.x = -1;
        } else if (horzVal > 0) {
            this.scale.x = 1;
        }

        //Move the ship horizontally
        this.x += horzVal * 15;

        //If the ship moves past 130 on the X axis then bring the ship back to 130
        if (this.x < 130) {
            this.x = 130;
        }

        //If the ship moves past the right bounds of the game, move the ship back to the right edge
        if (this.x > (this.level.game.world.width - (this.width / 2))) {
            this.x = (this.level.game.world.width - (this.width / 2));
        }

        //Move the ship in the verticle direction
        this.y += vertVal * 15;

        //If the ship moves past 50 on the Y axis move the ship back to 50
        if (this.y < 50) {
            this.y = 50;
        }

        //If the ship moves past the bottom bounds of the game, move the ship back to the bottom
        if (this.y > (this.level.game.world.height - (this.height / 2))) {
            this.y = (this.level.game.world.height - (this.height / 2));
        }

    };

    /**
     * Allows the rocket to fire a laser  
     *
     * @method fireWeapon
     */

    Game.Rocket.prototype.fireWeapon = function() {

        //  Grab the first bullet we can from the pool
        bullet = this.level.bullets.getFirstExists(false);

        //Determin the direction of the rocket sprite
        direction = this.scale.x;

        //Everything is multiplied by the "direction" to make sure it moves in the correct direction
        if (bullet) {
            //position the bullet infront of the Rocket
            bullet.reset(this.x + (100 * direction), (this.y - 30));

            //Turn the bullet the right direction
            bullet.scale.x = direction;

            //Move the bullet
            bullet.body.velocity.x = 2400 * direction;
        }

    };

    /**
     * get the damage rate of this weapon
     *
     * @method getDamageRate
     */

    Game.Rocket.prototype.getDamageRate = function() {
        return this.damageRate;
    };

    /**
     * set the damage rate of this weapon
     *
     * @method setDamageRate
     */

    Game.Rocket.prototype.setDamageRate = function(damageRate) {
        this.damageRate = damageRate;
    };
})();