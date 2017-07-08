/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Creates the powerBlast
*
* @class Game.Rocket.powerBlast
* @extends Phaser.Sprite
* @param {level} Reference to the current level being played
*/

(function () {
	
	//Load the power blast image
	Game.preloadItems.push({type:"image",name:"powerBlast",path:"assets/images/powerBlast.png"});

	Game.Rocket.powerBlast = function(level) {
		
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
		
		//Create the power blast sprite
		Phaser.Sprite.call(this, this.level.game, -100,-100, 'powerBlast');
		this.anchor.setTo(0.5,0.5);   
		this.name = "powerBlast";
		
	};

	Game.Rocket.powerBlast.prototype = Object.create(Phaser.Sprite.prototype);
	Game.Rocket.powerBlast.prototype.constructor = Game.Rocket.powerBlast;
	
	/**
	* Update loop for the enemy ship  
	*
	* @method update
	*/
	
	Game.Rocket.powerBlast.prototype.update = function() 
	{};
	
	/**
	* Activiates the power blast - called when the buttonpad button is pushed
	*
	* @method activate
	*/
	
	Game.Rocket.powerBlast.prototype.activate = function()
	{
		if(this.level.powerBlastAmount === this.level.powerBlastChargedAt)
		{

			//Fire the power blaster
			this.fire();

			//Set the power blaster limit to 0
			this.level.powerBlastAmount = 0;

			//Set the power blaster level text
			this.level.gameInterface.setPowerBlasterMessage(this.level.powerBlastAmount);

		}
	};
	
	/**
	* deactivates the power blast - called when the button pad is NOT pushed
	*
	* @method deactivate
	*/
	
	Game.Rocket.powerBlast.prototype.deactivate = function()
	{};
	
	/**
	* Scales down the power blast sprite
	*
	* @method hide
	*/
	
	Game.Rocket.powerBlast.prototype.hide = function()
	{
		this.scale.x = 0.1;
		this.scale.y = 0.1;
	};
	
	/**
	* Fires the power blaster
	*
	* @method fire
	*/
	
	Game.Rocket.powerBlast.prototype.fire = function()
	{
		posX = this.level.rocket.x;
		posY = this.level.rocket.y;

		var posTween = this.level.game.add.tween(this).to({ x: posX, y: posY }, 1, Phaser.Easing.Linear.None)
		.to({ x: posX, y: posY }, 500, Phaser.Easing.Linear.None)
		.to({ x: -100, y: -100 }, 1, Phaser.Easing.Linear.None)
		.start();

		var scaleTween = this.level.game.add.tween(this.scale).to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None)
		.to({ x: 1, y: 1 }, 250, Phaser.Easing.Linear.None)
		.to({ x: 0.1, y: 0.1 }, 10, Phaser.Easing.Linear.None)
		.start();	

		var alphaTween = this.level.game.add.tween(this).to({ alpha: 1}, 250, Phaser.Easing.Linear.None)
		.to({ alpha: 0}, 250, Phaser.Easing.Linear.None)
		.start();	
	};
	
	/**
	* get the damage rate of this weapon
	*
	* @method getDamageRate
	*/
	
	Game.Rocket.powerBlast.prototype.getDamageRate = function()
	{
		return this.damageRate;
	};
	
	/**
	* set the damage rate of this weapon
	*
	* @method setDamageRate
	*/

	Game.Rocket.powerBlast.prototype.setDamageRate = function(damageRate)
	{
		this.damageRate = damageRate;
	};
	
	
})();