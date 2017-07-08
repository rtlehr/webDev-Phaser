/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* The human action when it is falling
* happens after the human is captured and then the enemy ship is killed before it reaches the mother ship
*
* @class Game.Human.Fall
* @param {human} Reference to the human
*/

(function () {
	
	Game.Human.Fall = function(human) 
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
		
		this.stateName = "humanFall";

	};

	/**
	* Update loop for this state  
	*
	* @method update
	*/
	
	Game.Human.Fall.prototype.update = function()
	{
		//If the human is in the air (y < 540), then move him down until it reaches the ground (y = 540)
        if(this.human.y < this.human.level.groundLevel)
        {
            if(this.human.y+5 < this.human.level.groundLevel)
            {
                this.human.y += 5;
            }
            else
            {
                this.human.y = this.human.level.groundLevel;
            }
        }
        
		//When the human reaches the ground move it back to its orgX position
        if(this.human.y == this.human.level.groundLevel)
        {
            this.human.animations.play('walk');
            
			//Move the human to the right
            if(this.human.x < this.human.orgX)
            {
                
                this.human.scale.x = 1;
                
                if(this.human.x + 1.5 < this.human.orgX)
                {
                    this.human.x += 1.5;
                }
                else
                {
                    this.human.x = this.human.orgX;
                }
            }
            
			//Move the human to the left
            if(this.human.x > this.human.orgX)
            {

                this.human.scale.x = -1;
                
                if(this.human.x - 1.5 > this.human.orgX)
                {
                    this.human.x -= 1.5;
                }
                else
                {
                    this.human.x = this.human.orgX;
                }
            }
            
			//Once the human is in it's orgX position switch it's state back to walking and set its direction to walk to the right
            if(this.human.x == this.human.orgX)
            {
                //this.human.scale.x = (this.human.scale.x * -1);
                this.human.setCurrentState("humanWalking");
				this.human.currentState.setDirection(1);
            }
			
        }
        
	};
	
})();