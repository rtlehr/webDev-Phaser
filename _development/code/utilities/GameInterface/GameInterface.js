/**
* Draws the game interface
*
* @class Interface
* @constructor
* @param {String} msg A description of...
* 
*/

(function () {
   
GameInterface = function(game, stickSpeed, snapBack)
{
    this.game = game;
    
    this.stickSpeed = stickSpeed;
        
    this.snapBack = snapBack;
    
    this.interface = this.game.add.group();
    
    this.joyStick = null;
    
    this.buttonPad = null;
   
	this.scoreMessage = null;
	
	this.rocketLifeMessage = null;
	
	this.powerBlasterMessage = null;
	
	this.shieldMessage = null;
	
	this.fpsText = null;
	
	 this.create();
};

GameInterface.prototype = 
{
   
   /**
   * EXPLANATION...
   *
   * @method NAME
   * @return {Object} Copy of ...
   * 
   */
 
    create: function()
    {
		
		this.fpsText = this.game.add.bitmapText(500, 600, 'mainFont','FPS: 0', 22);
		this.interface.add(this.fpsText);
		
        this.joyStick = new Joystick(this.game,125,game.world.height - 125, {stickSpeed:this.stickSpeed, snapBack: this.snapBack, adjustRadius:45});
        this.interface.add(this.joyStick.getJoystick());
        
        this.buttonPad = new Buttonpad(this.game,900,game.world.height - 125);
        this.interface.add(this.buttonPad.getButtonpad());
		
		this.scoreMessage = this.game.add.bitmapText(25, 25, 'mainFont','Score: 000', 22);
		this.interface.add(this.scoreMessage);
		
		this.powerBlasterMessage = this.game.add.bitmapText(215, 25, 'mainFont','Power Blaster Level: 100%', 22);
		this.interface.add(this.powerBlasterMessage);
		
		this.shieldMessage = this.game.add.bitmapText(540, 25, 'mainFont','Shield Level: 100%', 22);
		this.interface.add(this.shieldMessage);
		
		this.rocketLifeMessage = this.game.add.bitmapText(830, 25, 'mainFont','Rytar Life: 100%', 22);
		this.interface.add(this.rocketLifeMessage);
		
    },
    
	/**
	* Hides the by setting the alpha to 0
	*
	* @method hideInterface
	* 
	*/
   
    hideInterface: function()
    {
        this.interface.alpha = 0;
    },
    
   /**
   * Shows the by setting the alpha to 1
   *
   * @method showInterface
   * 
   */
   
    showInterface: function()
    {
        this.interface.alpha = 1;
    },
    
   /**
   * Fixes the interface to the camera
   *
   * @method fixedToCamera
   * 
   */
   
    fixedToCamera: function()
    {
        this.interface.fixedToCamera = true;
    },
    
    /**
   * Standard update function
   *
   * @method update
   * 
   */
   
    update: function()
    {
        this.joyStick.update();
        this.buttonPad.update();
    },
    
    /**
   * Standard render function
   *
   * @method render
   * 
   */
   
    render: function()
    {
        this.joyStick.render();
    },
    
    /**
   * gets the horizontal value of the joystick
   *
   * @method getHorzVal
   * @return {number} horizontal value of the joystick 
   * 
   */
   
    getHorzVal: function()
    {
        return this.joyStick.getHorzVal();
    },
    
   /**
   * gets the vertical value of the joystick
   *
   * @method getVertVal
   * @return {number} vertical value of the joystick 
   * 
   */
   
    getVertVal: function()
    {
        return this.joyStick.getVertVal();
    },
    
    /**
   * Returns the number of the buttonbad button that was pushed.
   *
   * @method getButtonPushed
   * @return {number} the number of the buttonbad button that was pushed.
   * 
   */
   
    getButtonPushed: function()
    {
        return this.buttonPad.getButtonPushed();
    },
	
	/**
	* Sets the score message
	*
	* @param score - the current score
	* 
	*/
	
	setScoreMessage: function(score)
	{
		this.scoreMessage.setText('Score: ' + score);
	},
	
	/**
	* Sets the Power blast level message
	*
	* @param level - sets the level of the Power Blaster
	* 
	*/
	
	setPowerBlasterMessage: function(level)
	{
		this.powerBlasterMessage.setText('Power Blaster Level: ' + level + "%");
	},
	
	/**
	* Sets the Shield level message
	*
	* @param level - sets the level of the shiled
	* 
	*/
	
	setShieldMessage: function(level)
	{
		this.shieldMessage.setText('Shield Level: ' + level + "%");
	},
	
	/**
	* Sets the Shield level message
	*
	* @param level - sets the level of the shiled
	* 
	*/
	
	setHeroLifeMessage: function(level)
	{
		this.rocketLifeMessage.setText('Rytar Life: ' + level + "%");
	},
	setFPSMessage: function(fps)
	{
		this.fpsText.setText("FPS: " + fps);
	}
	
};

})();
