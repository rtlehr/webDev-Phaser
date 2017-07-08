/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* makes the enemy ship chase the rocket
*
* @class Game.EnemySaucer.ChaseHero
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.ChaseRocket = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "chaseHero";
	};
	
	/**
	* Main update function  
	*
	* @method update
	*/
	
	Game.EnemySaucer.ChaseRocket.prototype.update = function()
	{
		//Get angle from the enemy ship to the rocket
		var targetAngle = this.ufo.game.math.angleBetween(
			this.ufo.x, this.ufo.y,
			 this.ufo.rocket.x,  this.ufo.rocket.y
		);

		//Set the velocity of the enemy ship
		this.ufo.body.velocity.x = Math.cos(targetAngle) * this.ufo.level.UFOSpeed;
		this.ufo.body.velocity.y = Math.sin(targetAngle) * this.ufo.level.UFOSpeed;

	};
	
})();