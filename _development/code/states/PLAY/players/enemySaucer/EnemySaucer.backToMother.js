/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Return the enemy ship to the mother ship after it has captured a human
*
* @class Game.EnemySaucer.BackToMother
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.BackToMother = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "BackToMother";
	};

	/**
	* Main update function  
	*
	* @method update
	*/
	
	Game.EnemySaucer.BackToMother.prototype.update = function()
	{	
        //Get the mother ship sprite
		this.mothership = this.ufo.level.mothership;
		
		//Get angle from the enemy ship to the mother ship
		var targetAngle = this.ufo.game.math.angleBetween(
			this.ufo.x, this.ufo.y,
			this.mothership.x, this.mothership.y
		);

		//Set the velocity of the enemy ship
        this.ufo.body.velocity.x = Math.cos(targetAngle) * this.ufo.level.UFOSpeed;
		this.ufo.body.velocity.y = Math.sin(targetAngle) * this.ufo.level.UFOSpeed;     

	};

})();