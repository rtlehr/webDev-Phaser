/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* The human action when it is captured by an enemy ship
*
* @class Game.Human.Captured
* @param {human} Reference to the human
*/

(function () {
	
	Game.Human.Captured = function(human) 
	{
		/**
		* Reference to the human 
		* 
		* @property human
		* @type {Phaser.Sprite}
		*/
		
		this.human = human;
		
		/**
		* the name of the current state
		* 
		* @property stateName
		* @type {String}
		*/
		
		this.stateName = "humanCaptured";

	};

	/**
	* Update loop for this state  
	*
	* @method update
	*/
	
	Game.Human.Captured.prototype.update = function()
	{
		//Sets the humans x to it's enemy ships x
		this.human.x = this.human.ufo.x;
		
		//Add 50 to the enemy ships y, so that the human falls just below it
		this.human.y = this.human.ufo.y + 50;
		
		//Move the animation to the idle frame
		this.human.animations.play('captured');
		
	};
	
})();