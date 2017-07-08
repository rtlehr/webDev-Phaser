/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* sets up the canvas for the game.  
* sets up the boot state and starts it
*/

(function () {
	
	//Create the game
	game = new Phaser.Game(1024, 672, Phaser.AUTO, 'game');
		
	//Create the Boot state.
	game.state.add('Boot', Game.State.Boot);
	
	//Start the boot state
	game.state.start('Boot');

})();

