/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds all of the code for the collisions of the game
 * This is NOT a class, I just seperated out the collision code for orgnization
 *
 * @class Game.State.Play.collisions
 */

(function() {


    /**
     * Manages the collisions between the weaponGroup and the enemyGroup 
     *
     * @method weaponCollision
     * @param weapon The weapon that was fired
     * @param enemy The enemy that the weapon hit
     */

    Game.State.Play.prototype.weaponCollision = function(weapon, enemy) {
        //Subtract the damage the we get from weapon.getDamageRate() from the enemy (damage() is in the Phaser.Sprite class)
        enemy.onHit(weapon.getDamageRate());

    };

    /**
     * Manages the collisions between the rocket and the enemyGroup 
     *
     * @method rocketCollision
     * @param rocket The rocket
     * @param enemy The enemy that the weapon hit
     */

    Game.State.Play.prototype.rocketCollision = function(rocket, enemy) {
        //subtract points from the rockets life		
        rocket.damage(enemy.getDamageRate());

        //update the rockets life in the game interface
        this.gameInterface.setHeroLifeMessage(Math.round((rocket.health / this.heroMaxLife) * 100));

        //Subtract the damage the we get from weapon.getDamageRate() from the enemy (damage() is in the Phaser.Sprite class)
        enemy.onHit(rocket.getDamageRate());
    };

    /**
     * Manages the collisions between the rocket and the mother ship 
     *
     * @method rocketMotherCollision
     * @param rocket The rocket
     * @param mother The mother ship
     */

    Game.State.Play.prototype.rocketMotherCollision = function(rocket, mother) {
        //If the shield is off when the rocket hits the Mother Ship, then damage the ship
        if (!this.shield.isShieldOn()) {
            //Subtract points from the rocket
            rocket.damage(mother.getDamageRate());

            //update the rockets life in the game interface
            this.gameInterface.setHeroLifeMessage(Math.round((rocket.health / this.heroMaxLife) * 100));
        }
    };

    /**
     * Manages the collisions between the bulletGroup and the enemyGroup 
     *
     * @method rocketMotherCollision
     * @param bullet The bullet that hit the enemy ship
     * @param{enemy The enemy ship that was hit by the bullet
     */

    Game.State.Play.prototype.collisionHandler = function(bullet, enemy) {

        //kill the bullet
        bullet.kill();

        //Subtract the damage the we get from weapon.getDamageRate() from the enemy (damage() is in the Phaser.Sprite class)
        enemy.onHit(bullet.getDamageRate());

    };

    /**
     * Manages the collision between a human and the enemy ship 
     * This returns the enemy ship back to the mother ship with the human in tow
     *
     * @method backToShip
     * @param human The human
     * @param enemy The enemy ship
     */

    Game.State.Play.prototype.backToShip = function(human, enemy) {
        //If the human is on the ground.  If a human is falling then do not allow a UFO to kidnap them
        if (human.y == this.groundLevel) {
            //Kill the human
            human.setCurrentState("humanCaptured");

            //Set the state of the UFO to backToMother so the UFO returns to the mother ship
            //We set the name of the sprite to the instance of its enemySaucer object in the this.enemy array, so we can refernce it with enemy["name"]
            enemy.setCurrentState("backToMother");
            //set the hasHuman bool to true
            enemy.switchHasHuman();

        }

    };

    /**
     * Manages the collision between a mother ship and the enemy ship 
     * AFTER the enemy ship has captured a humn
     *
     * @method backToShip
     * @param mothership The mother ship
     * @param enemy The enemy ship that hit the mother ship
     */

    Game.State.Play.prototype.enemyHome = function(motherShip, enemy) {

        //If the UFO has a human.  
        if (enemy.hasHuman) {

            //Destroy the human sprite
            enemy.myHuman.destroy();

            //Kill the enemy sprite
            enemy.damage(enemy.health);
            enemy.clean();
            enemy.setCurrentState("whatDoIDo");

        }

    };

})();