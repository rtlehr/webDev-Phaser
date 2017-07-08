/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Creates the mother ship
*
* @class Game.MotherShip
* @extends Phaser.Sprite
* @param {human} Reference to the human
*/

(function () {
	
	//Load the mother ship image
	Game.preloadItems.push({type:"image",name:"motherShip",path:"assets/images/motherShip.png"});

	Game.MotherShip = function(level) {

		/**
		* A reference to the currently level being run.
		* 
		* @property level
		* @type {Object}
		*/

		this.level = level;
		
		/**
		* The amount of damage this enemy ship does if it hits something
		* 
		* @property damageRate
		* @type {Number}
		*/

		this.damageRate = 20;
		
		//Create the mother ship
		Phaser.Sprite.call(this, this.level.game, (this.level.game.world.width/2),75, 'motherShip');
		this.anchor.setTo(0.5,0.5); 
		this.name = "motherShip";
		
		/**
		* Set the speed of the mother ship
		* 
		* @property speed
		* @type {Number}
		* @default 3
		*/
		
		this.speed = this.level.motherShipSpeed;

	};

	Game.MotherShip.prototype = Object.create(Phaser.Sprite.prototype);
	Game.MotherShip.prototype.constructor = Game.MotherShip;
	
	/**
	* Update loop for the enemy ship  
	*
	* @method update
	*/
	
	Game.MotherShip.prototype.update = function() 
	{
		//Move the mother ship across the screen
		this.x += this.speed;

		//Switch directions when the mother ship reaches it's outer bounds
		if(this.x < 250 || this.x > (this.game.world.width - 250))
		{
			this.speed = this.speed * -1;
		}

	};
	
	/**
	* set the damage rate of this weapon
	*
	* @method getDamageRate
	*/

	Game.MotherShip.prototype.getDamageRate = function()
	{
		return this.damageRate;
	};
	
	/**
	* Called when the enemy ship is hit by a weapon  
	*
	* @method onHit
	*/
	
	Game.MotherShip.prototype.onHit = function(damage)
	{};
	
})();