/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Creates the rockets laser
 *
 * @class Game.Rocket.Laser
 * @extends Phaser.Sprite
 * @param {level} Reference to the current level being played
 */

(function() {

    //Loads the laser image
    Game.preloadItems.push({ type: "image", name: "bullet", path: "assets/images/bullet.png" });

    Game.Rocket.Laser = function(level) {

        /**
         * A reference to the currently level being run.
         * 
         * @property level
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
         * Set to true if the shield is active
         * 
         * @property shieldOn
         * @type {bool}
         * @default false
         */

        //Create the bullet sprite
        Phaser.Sprite.call(this, this.level.game, 0, 0, 'bullet');
        this.anchor.setTo(0, 0.5);
        this.name = "laser";

    };

    Game.Rocket.Laser.prototype = Object.create(Phaser.Sprite.prototype);
    Game.Rocket.Laser.prototype.constructor = Game.Rocket.Laser;

    /**
     * Update loop for the enemy ship  
     *
     * @method update
     */

    Game.Rocket.Laser.prototype.update = function() {};

    /**
     * Activate the shield  
     *
     * @method activate
     */

    Game.Rocket.Laser.prototype.activate = function() {

    };

    /**
     * deactivate the shield  
     *
     * @method deactivate
     */

    Game.Rocket.Laser.prototype.deactivate = function() {};

    /**
     * get the damage rate of this weapon
     *
     * @method getDamageRate
     */

    Game.Rocket.Laser.prototype.getDamageRate = function() {
        return this.damageRate;
    };

    /**
     * set the damage rate of this weapon
     *
     * @method setDamageRate
     */

    Game.Rocket.Laser.prototype.setDamageRate = function(damageRate) {
        this.damageRate = damageRate;
    };

})();