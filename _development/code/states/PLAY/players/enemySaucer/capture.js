/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Set the enemy ship to chase a human
 *
 * @class Game.EnemySaucer.capture
 * @param {ufo} reference to the enemy ship class
 */

(function() {

    Game.EnemySaucer.capture = function(ufo) {
        this.ufo = ufo;

        this.stateName = "chaseHuman";
    };

    /**
     * Main update function  
     *
     * @method update
     */

    Game.EnemySaucer.capture.prototype.update = function() {
        //Get angle from the enemy ship to the human
        var targetAngle = this.ufo.game.math.angleBetween(
            this.ufo.x, this.ufo.y,
            this.ufo.myHuman.x, this.ufo.myHuman.y
        );

        //Set the velocity of the enemy ship
        this.ufo.body.velocity.x = Math.cos(targetAngle) * this.ufo.level.UFOSpeed;
        this.ufo.body.velocity.y = Math.sin(targetAngle) * this.ufo.level.UFOSpeed;

    };

})();