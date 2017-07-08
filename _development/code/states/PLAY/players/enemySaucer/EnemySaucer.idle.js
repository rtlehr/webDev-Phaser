/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Set the enemy ship to its idle state
*
* @class Game.EnemySaucer.Idle
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.Idle = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "idle";
	};

	/**
	* Main update function  
	*
	* @method update
	*/

	Game.EnemySaucer.Idle.prototype.update = function()
	{};
	
})();