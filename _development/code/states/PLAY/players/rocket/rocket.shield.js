/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Creates the powerBlast
*
* @class Game.Rocket.shield
* @extends Phaser.Sprite
* @param {level} Reference to the current level being played
*/

(function () {
	
	//Loads the shield image
	Game.preloadItems.push({type:"image",name:"shield",path:"assets/images/shield.png"});

	Game.Rocket.shield = function(level) {

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
		
		this.shieldOn = false;
		
		//Create the shield sprite
		Phaser.Sprite.call(this, this.level.game, -100,-100, 'shield');
		this.anchor.setTo(0.5,0.5);   
		this.name = "shield";

	};

	Game.Rocket.shield.prototype = Object.create(Phaser.Sprite.prototype);
	Game.Rocket.shield.prototype.constructor = Game.Rocket.shield;
	
	/**
	* Update loop for the enemy ship  
	*
	* @method update
	*/
	
	Game.Rocket.shield.prototype.update = function() 
	{
		//IF the shield is off, kill it, once it's on revive it
		if(this.isShieldOn())
		{
			this.revive();
		}
		else
		{
			this.kill();	
		}
		
		//Move the shield sprite to follow the rocket
		this.position.copyFrom(this.level.rocket.position);

		
	};
	
	/**
	* Activate the shield  
	*
	* @method activate
	*/
	
	Game.Rocket.shield.prototype.activate = function()
	{
		//Subtract the amount of the shield drain from the current power
		this.level.shieldPower -= this.level.shieldDrain;

		//If the shiledPower is less than 0 set it to 0
		if(this.level.shieldPower < 0)
		{
			this.level.shieldPower = 0;
		}

		//If the shieldPower is greater than 0 turn the shield on ELSE turn it off
		if(this.level.shieldPower > 0)
		{

			this.on();

		}
		else
		{
			this.off();
		}
				
		//Set the game interface with the shield power
		this.level.gameInterface.setShieldMessage(Math.round((this.level.shieldPower/this.level.maxShieldPower)*100));
	};
	
	/**
	* deactivate the shield  
	*
	* @method deactivate
	*/
	
	Game.Rocket.shield.prototype.deactivate = function()
	{
		if(this.isShieldOn())
		{			
			this.off();	
		}
	};
	
	/**
	* Make the shield very small  
	*
	* @method hide
	*/
	
	Game.Rocket.shield.prototype.hide = function()
	{
		this.scale.x = 0.1;
		this.scale.y = 0.1;
	};
	
	/**
	* Turns the shield on  
	*
	* @method on
	*/
	
	Game.Rocket.shield.prototype.on = function()
	{
		var scaleTween = this.level.game.add.tween(this.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None)
		.to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None)
		.start();	

		var alphaTween = this.level.game.add.tween(this).to({ alpha: 1}, 250, Phaser.Easing.Linear.None)
		.start();	

		this.shieldOn = true;
	};
	
	/**
	* Turns the shield off  
	*
	* @method off
	*/
	
	Game.Rocket.shield.prototype.off = function()
	{
		var scaleTween = this.level.game.add.tween(this.scale).to({ x: 0.1, y: 0.1 }, 250, Phaser.Easing.Linear.None)
		.to({ x: 0.1, y: 0.1 }, 250, Phaser.Easing.Linear.None)
		.start();	

		var alphaTween = this.level.game.add.tween(this).to({ alpha: 0}, 250, Phaser.Easing.Linear.None)
		.start();	

		this.shieldOn = false;
	};
	
	/**
	* returns the value of shieldOn  
	*
	* @method isShieldOn
	* @return shieldOn
	*/
	
	Game.Rocket.shield.prototype.isShieldOn = function()
	{
		return this.shieldOn;	
	};
	
	/**
	* get the damage rate of this weapon
	*
	* @method getDamageRate
	*/
	
	Game.Rocket.shield.prototype.getDamageRate = function()
	{
		return this.damageRate;
	};
	
	/**
	* set the damage rate of this weapon
	*
	* @method setDamageRate
	*/

	Game.Rocket.shield.prototype.setDamageRate = function(damageRate)
	{
		this.damageRate = damageRate;
	};
	
})();
