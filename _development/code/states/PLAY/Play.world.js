/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the code for code that is needed on each level
* This is NOT a class, I just seperated out some of the code for orgnization
*
* @class Game.State.Play.world
*/

(function () {

	/**
	* Creates the humans for the game and puts them in the friendGroup 
	*
	* @method createFriend
	*/
	
	Game.State.Play.prototype.createFriend = function()
	{
		this.friend = new Game.Human(this, (this.friendPos*(this.friendGroup.length + 1)));
		this.friendGroup.add(game.add.existing(this.friend));		
	};
	
	/**
	* Creates multiple number of friends with one call 
	*
	* @method createMultiFriends
	*/
	
	Game.State.Play.prototype.createMultiFriends = function(numOfFriends)
	{
		for(count = 0; count<numOfFriends;count++)
		{
			this.createFriend();
		}
	};

	/**
	* Creates the enemies for the game and puts them in the enemyGroup 
	*
	* @method createEnemy
	8 @param {enemyToCreate} The class of the enemy to create
	*/
	
	Game.State.Play.prototype.createEnemy = function(enemyToCreate)
	{

		this.enemy = new enemyToCreate(this);
		this.enemy.health = this.enemyMaxHealth;
		this.enemyGroup.add(game.add.existing(this.enemy));	
		this.enemy.onCreate();

	};
	
	/**
	* Creates multiple number of enemies with one call 
	*
	* @method createMultiEnemies
	* @param {numOfEnemies} the total number of enemies to create
	* @param {enemyToCreate} The class of the enemy to create
	*/
	
	Game.State.Play.prototype.createMultiEnemies = function(numOfEnemies, enemyToCreate)
	{
		
		for(count = 0; count<numOfEnemies;count++)
		{
			this.createEnemy(enemyToCreate);
		}
	};
	
	/**
	* Revive a killed enemy 
	*
	* @method reviveEnemy
	*/
	
	Game.State.Play.prototype.reviveEnemy = function(reviveMe)
	{
		//Revive the enemy
		reviveMe.revive();
		
		//Move the enemy to the location of the mother ship
		reviveMe.reset(this.mothership.x, this.mothership.y, this.enemyMaxHealth);

		//Assign the enemy to it's target
		reviveMe.onCreate();
	};

	/**
	* Set the spacing for the enemy 
	*
	* @method setFriendSpacing
	*/
	
	Game.State.Play.prototype.setFriendSpacing = function(spacing)
	{
			this.friendPos = spacing;
	};

})();