/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the code for the game States Boot
*
* @class Game.State.Boot
*/

(function () {
	
	/**
	* Creates Boot state of the game 
	*
	* @method Game.world
	* @param {game} Reference to the current game
	*/
	
	Game.State.Boot = function (game) 
	{
		/**
		* A reference to the currently running Game.
		* 
		* @property game
		* @type {Object}
		*/
		
		this.game = game;
	};

	/**
	* Set parameters needed to create the game 
	*
	* @method preload
	*/
	
    Game.State.Boot.prototype.preload = function () {
        
        this.game.stage.disableVisibilityChange = true;
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		
		this.scale.minWidth = 480;                                                                                                                      
		this.scale.minHeight = 260;
		this.scale.maxWidth = 1024;
		this.scale.maxHeight = 672;
		
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		
		//this.scale.setScreenSize(true);
		
		this.stage.forcePortrait = false;
		this.stage.backgroundColor = '#111111';
		
		this.input.addPointer();
        
        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.game.load.image('nonsenseLogo', 'assets/images/nonsense/nonsenseLogo.gif');
        this.game.load.image('preloaderBar', 'assets/images/nonsense/loadbar.gif');
        
    };
	
	/**
	* Create the differnt states of the game 
	* start the preloader state
	*
	* @method create
	*/
	
    Game.State.Boot.prototype.create = function () {
		
        //Add all game states
		this.game.state.add('Preloader', Game.State.Preloader);
		this.game.state.add('MainMenu', Game.State.MainMenu);
        this.game.state.add('Play', Game.State.Play);

        this.state.start('Preloader');

    };
	
	/**
	* This could be handy if you need to do any extra processing if the game resizes. 
	* A resize could happen if for example swapping orientation on a device.
	*
	* @method gameResized
	*/
	
    Game.State.Boot.prototype.gameResized = function (width, height) {};
	
	/**
	* Shows the "incorrect orientation" div if device is entered in the the wrong orientation 
	*
	* @method enterIncorrectOrientation
	*/
	
    Game.State.Boot.prototype.enterIncorrectOrientation = function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    };
	
	/**
	* Shows the "incorrect orientation" div if device leaves the the wrong orientation 
	*
	* @method enterIncorrectOrientation
	*/
	
    Game.State.Boot.prototype.leaveIncorrectOrientation = function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    };

})();