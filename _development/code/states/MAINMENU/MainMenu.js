/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the code for the game States MainMenu
*
* @class Game.State.MainMenu
*/

(function () {
	
	//Add the "begin" button to the preloader
	Game.preloadItems.push({type:"spriteSheet",name:"begin-butt",path:"assets/images/nonsense/begin.png",width:300,height:45,frameCount:3});
	
	/**
	* Creates MainMenu state of the game 
	*
	* @method Game.MainMenu
	* @param {game} Reference to the current game
	*/
	
	Game.State.MainMenu = function (game) 
	{

		/**
		* A reference to the currently running Game.
		* 
		* @property game
		* @type {Object}
		*/
		
		this.game = game;
		
		/**
		* A reference to the play button
		* 
		* @property playButton
		* @type {Phaser.Sprite}
		*/
		
		this.playButton = null;
	};
	
	/**
	* Creates The main menu items 
	*
	* @method create
	*/
	
	Game.State.MainMenu.prototype.create = function () {
        
		this.nonsenseLogo = this.game.add.sprite(0, 0, 'nonsenseLogo');
        this.nonsenseLogo.x = (this.game.width/2) - (this.nonsenseLogo.width/2);
        this.nonsenseLogo.y = (this.game.height/2) - (this.nonsenseLogo.height);
        
        this.preloadBar = this.game.add.sprite(0, 0, 'preloaderBar');
        this.preloadBar.x = this.nonsenseLogo.x;
        this.preloadBar.y = this.nonsenseLogo.y + this.nonsenseLogo.height;
        
		this.playButton = this.game.add.button(0, 0, 'begin-butt', this.startGame,this,2,1,0);
        this.playButton.x = (this.game.width/2) - (this.playButton.width/2);
        this.playButton.y = this.preloadBar.y + this.preloadBar.height;
        
	};
	
	/**
	* Loads the first level of the game play 
	*
	* @method startGame
	*/
	
	Game.State.MainMenu.prototype.startGame = function (pointer) 
	{

		//	And start the actual game
		this.state.start('Play');

	};

})();