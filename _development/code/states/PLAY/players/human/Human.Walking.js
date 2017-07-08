/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* The human action when it is walking
*
* @class Game.Human.Walking
* @param {human} Reference to the human
*/

(function () {
	
	Game.Human.Walking = function(human) 
	{
		/**
		* Reference to the human 
		* 
		* @property human
		* @type {Phaser.Sprite}
		*/
		
		this.human = human;
		
		/**
		* the direction the human is walking (1 = right, -1 = left) 
		* 
		* @property walkDirection
		* @type {Number}
		*/
		
		this.walkDirection = 1;
		
		/**
		* the name of the current state
		* 
		* @property stateName
		* @type {String}
		*/
		
		this.stateName = "humanWalking";
	};

	/**
	* Update loop for this state  
	*
	* @method update
	*/
	
	Game.Human.Walking.prototype.update = function()
	{

        //Set the animation to walk
		this.human.animations.play('walk');
		
		//Move the human in the direction he is walking
		this.human.x += (1.5 * this.walkDirection);

		//Switch the direction of the human
		if( Math.abs(this.human.orgX - this.human.x) >= (this.human.walkingRange/2))
		{

			this.walkDirection = this.walkDirection * -1;
			this.human.scale.x = this.human.scale.x * -1;

		}

	};
	
	/**
	* Set the direction for the human to walk  
	*
	* @method setDirection
	*/
	
	Game.Human.Walking.prototype.setDirection = function(direction)
	{
		this.walkDirection = direction;
		this.human.scale.x = direction;
	};

})();	