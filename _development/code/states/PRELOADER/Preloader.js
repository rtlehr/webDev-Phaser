/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the code for the game States Preloader
*
* @class Game.State.Preloader
*/

(function () {

	/**
	* Creates Preloader state of the game 
	*
	* @method Game.Preloader
	* @param {game} Reference to the current game
	*/
	
	Game.State.Preloader = function (game) 
	{
		/**
		* A reference to the currently running Game.
		* 
		* @property game
		* @type {Object}
		*/
		
		this.game = game;
		
		/**
		* A reference to the nonsenseLogo
		* 
		* @property nonsenseLogo
		* @type {Phaser.Sprite}
		*/
		
		this.nonsenseLogo = null;
		
		/**
		* A reference to the preloadBar
		* 
		* @property preloadBar
		* @type {Phaser.Sprite}
		*/
		
		this.preloadBar = null;

	};

	/**
	* Preloads all images needed for this level 
	* Using my preloadItems array to load items.
	*
	* @method preload
	*/
	
	Game.State.Preloader.prototype.preload = function ()
    {
		//Load the game logo
		this.nonsenseLogo = this.game.add.sprite(0, 0, 'nonsenseLogo');
		this.nonsenseLogo.x = (this.game.width/2) - (this.nonsenseLogo.width/2);
		this.nonsenseLogo.y = (this.game.height/2) - (this.nonsenseLogo.height);

		//load the loader bar
		this.preloadBar = this.game.add.sprite(0, 0, 'preloaderBar');
		this.preloadBar.x = this.nonsenseLogo.x;
		this.preloadBar.y = this.nonsenseLogo.y + this.nonsenseLogo.height;
		this.load.setPreloadSprite(this.preloadBar);

		//load all items in Game.preloadItems array
		for(count=0;count<Game.preloadItems.length;count++)
		{
			//Get the type of item in the preloader array
			switch (Game.preloadItems[count].type)
			{

				case "image":
					this.game.load.image(Game.preloadItems[count].name, Game.preloadItems[count].path);
					break;

				case "spriteSheet":
					this.game.load.spritesheet(Game.preloadItems[count].name, Game.preloadItems[count].path, Game.preloadItems[count].width, Game.preloadItems[count].height,Game.preloadItems[count].frameCount);
					break;

				case "audio":

					this.game.load.audio(Game.preloadItems[count].name, Game.preloadItems[count].path);
					break;

				case "font":

					this.game.load.bitmapFont(Game.preloadItems[count].name, Game.preloadItems[count].path, Game.preloadItems[count].xml);
					break;

				case "atlas":

					this.game.load.atlasXML(Game.preloadItems[count].name, Game.preloadItems[count].path, Game.preloadItems[count].xml);
					break;

				case "text":

					this.game.load.text(Game.preloadItems[count].name, Game.preloadItems[count].path);
					break;

				case "tilemap":

					this.game.load.tilemap(Game.preloadItems[count].name, Game.preloadItems[count].path, null, Phaser.Tilemap.TILED_JSON);
					break;
                    
                case "jsonHash":
                    
                    this.game.load.atlasJSONHash(Game.preloadItems[count].name, Game.preloadItems[count].image, Game.preloadItems[count].jsonData);
					break;
			}
		}

	};

	/**
	* Create everything for the game 
	*
	* @method create
	*/
	
	Game.State.Preloader.prototype.create = function () 
    {
		//Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	};
	
	/**
	* Start the mainMenu state 
	*
	* @method update
	*/
	
	Game.State.Preloader.prototype.update = function () 
    {
        
		this.state.start('MainMenu');

	};

})();