/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the code for the game
*/

(function () {
    
Game = {

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: false,
    
    //Turn on games debug calls
    debug: false,
        
};

})();

//Array to hold preload items
Game.preloadItems = [];

/**
* Creates a button like input device for your game
*
* @class Buttonpad
* @constructor
* @game {Phaser Game} Reference to the Phaser game
* @x {Num} x position of the joystick
* @y {num} y location of the joystick
* @pref {Object} Preferences for the joystick
*/

//Push the graphics into the preload array
Game.preloadItems.push({type:"image",name:"pad",path:"assets/images/gamePad/buttonpad-base.png"});
Game.preloadItems.push({type:"image",name:"top",path:"assets/images/gamePad/buttonpad-top.png"});
Game.preloadItems.push({type:"image",name:"left",path:"assets/images/gamePad/buttonpad-left.png"});
Game.preloadItems.push({type:"image",name:"right",path:"assets/images/gamePad/buttonpad-right.png"});
Game.preloadItems.push({type:"image",name:"bottom",path:"assets/images/gamePad/buttonpad-bottom.png"});
Game.preloadItems.push({type:"image",name:"center",path:"assets/images/gamePad/buttonpad-center.png"});

(function () {
    
Buttonpad = function(game,x,y)
{
    /**
    * Intance of the current game
    * 
    * @property game
    * @type {Phaser.Game}
    */
    
    this.game = game;
    
    /**
    * The top left x position of the button pad
    * 
    * @property xPos
    * @type {Number}
    */
    
    this.xPos = x;
    
    /**
    * The top left y position of the button pad
    * 
    * @property yPos
    * @type {Number}
    */
    
    this.yPos = y;
    
    /**
    * Tells program if the top button is pressed
    * 
    * @property topPressed
    * @type {Bool}
    * @default false
    */
    
    this.topPressed = false;
    
    /**
    * Tells program if the right button is pressed
    * 
    * @property rightPressed
    * @type {Bool}
    * @default false
    */
    
    this.rightPressed = false;
    
    /**
    * Tells program if the left button is pressed
    * 
    * @property leftPressed
    * @type {Bool}
    * @default false
    */
    
    this.leftPressed = false;
    
    /**
    * Tells program if the bottom button is pressed
    * 
    * @property bottomPressed
    * @type {Bool}
    * @default false
    */
    
    this.bottomPressed = false;
    
    /**
    * Tells program if the center button is pressed
    * 
    * @property centerPressed
    * @type {Bool}
    * @default false
    */
    
	this.centerPressed = false;
    
    this.buttonPushed = 0;
    
    
    /**
    * Holds the sprites for the button pad
    * 
    * @property buttonPad
    * @type {Phaser.Group}
    */
    
    this.buttonPad = this.game.add.group();
    
    this.create();
};

Buttonpad.prototype = 
{
    /**
    * Preload images of the Buttonpad 
    *
    * @method preload
    */
    
	preload: function () {},
    
    /**
    * Create the Buttonpad 
    *
    * @method create
    */
    
	create: function () 
	{
        //create the base
		this.pad = this.game.add.sprite(this.xPos,this.yPos,'pad');
        this.pad.anchor.setTo(0.5,0.5);
        this.buttonPad.add(this.pad);
        
        this.radius = this.pad.width/4;

        //create the buttons
		this.top = this.game.add.sprite(this.pad.x,(this.yPos - (this.pad.height/2)),'top');
        this.top.anchor.setTo(0.5,0.5);
        this.top.inputEnabled=true;
        this.buttonPad.add(this.top);
        
		this.right = this.game.add.sprite((this.pad.x + (this.pad.width/2)),this.pad.y,'right');
        this.right.anchor.setTo(0.5,0.5);
        this.right.inputEnabled=true;
        this.buttonPad.add(this.right);
        
		this.bottom = this.game.add.sprite(this.pad.x,(this.pad.y + (this.pad.height/2)),'bottom');
        this.bottom.anchor.setTo(0.5,0.5);
        this.bottom.inputEnabled=true;
        this.buttonPad.add(this.bottom);
        
		this.left = this.game.add.sprite((this.pad.x - (this.pad.width/2)),this.pad.y,'left');
        this.left.anchor.setTo(0.5,0.5);
        this.left.inputEnabled=true;
        this.buttonPad.add(this.left);
        
        this.center = this.game.add.sprite(this.pad.x,this.pad.y,'center');
        this.center.anchor.setTo(0.5,0.5);
        this.center.inputEnabled=true;
        this.buttonPad.add(this.center);
        
        
        if(this.game.device.desktop)
        {
            this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.W, Phaser.Keyboard.D, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.X]);
        }
        else
        {
            
            this.top.events.onInputDown.add(this.switchTop,this);
            this.top.events.onInputUp.add(this.switchTop,this);
            
            this.bottom.events.onInputDown.add(this.switchBottom,this);    
            this.bottom.events.onInputUp.add(this.switchBottom,this);
            
            this.right.events.onInputDown.add(this.switchRight,this);
            this.right.events.onInputUp.add(this.switchRight,this);
            
            this.left.events.onInputDown.add(this.switchLeft,this);
            this.left.events.onInputUp.add(this.switchLeft,this);
            
            this.center.events.onInputDown.add(this.switchCenter,this);
            this.center.events.onInputUp.add(this.switchCenter,this);
        }
        
        
    },
    
    /**
    * Sets the value of buttonPushed to 1 when the top button is cliked 
    *
    * @method topClicked
    */
    
    switchTop: function()
    {
        this.topPressed = !this.topPressed;
    },
    
    /**
    * Sets the value of buttonPushed to 2 when the right button is cliked 
    *
    * @method rightClicked
    */
    
    switchRight: function()
    {
        this.rightPressed = !this.rightPressed;
    },
    
    /**
    * Sets the value of buttonPushed to 3 when the bottom button is cliked 
    *
    * @method bottomClicked
    */
    
    switchBottom: function()
    {
        this.bottomPressed = !this.bottomPressed;
    },
    
    /**
    * Sets the value of buttonPushed to 4 when the left button is cliked 
    *
    * @method leftClicked
    */
    
    switchLeft: function()
    {
        this.leftPressed = !this.leftPressed;
    },
    
    /**
    * Sets the value of buttonPushed to 1 when the space button is cliked 
    *
    * @method spaceClicked
    */
    
    switchCenter: function()
    {
        this.centerPressed = !this.centerPressed;
    },
	checkTop: function()
	{
		return this.topPressed;	
	},
	checkLeft: function()
	{
		return this.leftPressed;	
	},
	checkRight: function()
	{
		return this.rightPressed;	
	},
	checkBottom: function()
	{
		return this.bottomPressed;	
	},
	checkCenter: function()
	{
		return this.centerPressed;	
	},
    /**
    * Sets the value of buttonPushed to 0 after a button is released 
    *
    * @method setToZero
    */
    
    setToZero: function()
    {
        this.buttonPushed = 0;
    },
    
    /**
    * Returns the value of buttonPushed
    *
    * @method getButtonPushed
    */
    
    getButtonPushed: function()
    {
        return this.buttonPushed;                
    },
    
    /**
    * Update the Buttonpad 
    *
    * @method update
    */
    
	update: function () 
    {
		if(this.game.device.desktop)
        {
			
			if(game.input.keyboard.isDown(Phaser.Keyboard.W))
			{
				this.topPressed = true;
			}
			else
			{
				this.topPressed = false;
			}

			if(game.input.keyboard.isDown(Phaser.Keyboard.D))
			{
				this.rightPressed = true;
			}
			else
			{
				this.rightPressed = false;
			}

			if(game.input.keyboard.isDown(Phaser.Keyboard.X))
			{
				this.bottomPressed = true;
			}
			else
			{
				this.bottomPressed = false;
			}

			if(game.input.keyboard.isDown(Phaser.Keyboard.A))
			{
				this.leftPressed = true;
			}
			else
			{
				this.leftPressed = false;
			}

			if(game.input.keyboard.isDown(Phaser.Keyboard.S))
			{
				this.centerPressed = true;
			}
			else
			{
				this.centerPressed = false;
			}       
		}
    },
    /**
    * Fixes the buttonpad group to the camera 
    *
    * @method fixToCamera
    */
    fixToCamera: function()
    {
        this.buttonPad.fixedToCamera = true;
    },
    /**
    * returns the buttonpad group
    *
    * @method getButtonpad
    */
    getButtonpad: function()
    {
        return this.buttonPad;
    },
    /**
    * sets the buttonpad group alpha to 1
    *
    * @method showButtonpad
    */
    showButtonpad: function()
    {
        this.buttonPad.alpha = 1;
    },
    /**
    * sets the buttonpad group alpha to 0
    *
    * @method hideButtonpad
    */
    hideButtonpad: function()
    {
        this.buttonPad.alpha = 0;
    }
}

})();
/**
* Creates a Joystick like input device for your game
*
* @class joyStick
* @constructor
* @game {Phaser Game} Reference to the Phaser game
* @x {Num} x position of the joystick
* @y {num} y location of the joystick
* @pref {Object} Preferences for the joystick
*/

//Push the graphics into the preload array
Game.preloadItems.push({type:"image",name:"base",path:"assets/images/gamePad/joystick-base.png"});
Game.preloadItems.push({type:"image",name:"stick",path:"assets/images/gamePad/joystick-stick.png"});

(function () {
    
Joystick = function(game,x,y,pref)
{
    /**
    * Intance of the current game
    * 
    * @property game
    * @type {Phaser.Game}
    */
    
	this.game = game;
    
    /**
    * The top left x position of the button pad
    * 
    * @property xPos
    * @type {Number}
    */
    
    this.xPos = x;
    
    /**
    * The top left y position of the button pad
    * 
    * @property yPos
    * @type {Number}
    */
    
    this.yPos = y;
    
    /**
    * Holds the preferences for the joystick
    * 
    * @property yPos
    * @type {Object}
    */
    
    this.pref= pref;
    
    if(this.pref == undefined)
    {
        this.pref = {};
    }
    
    /**
    * the speed the joystick is moved (used for keyboard input)
    * 
    * @property stickSpeed
    * @type {Number}
    * @default 2
    */
    
    this.stickSpeed = (this.pref.hasOwnProperty("stickSpeed"))?this.pref.stickSpeed:2;
    
    /**
    * The maximum number the joy stick can go if the user is using a desktop
    * 
    * @property desktopMax
    * @type {Number}
    * @default 50
    */
    
    this.desktopMax = (this.pref.hasOwnProperty("desktopMax"))?this.pref.desktopMax:50;
    
    /**
    * tells the joystick if when not being used it snaps back to netural position
    * 
    * @property snapBack
    * @type {bool}
    * @default true
    */
    
    this.snapBack = (this.pref.hasOwnProperty("snapBack"))?this.pref.snapBack:true;
    
    /**
    * Fine tunes the outer bounds of the joystick
    * 
    * @property adjustRadius
    * @type {Number}
    * @default 0
    */
    
    this.adjustRadius = (this.pref.hasOwnProperty("adjustRadius"))?this.pref.adjustRadius:0;
    
    /**
    * Value of the horizontal position of the joystick
    * Left = -1
    * Netural = 0
    * Right = 1
    * 
    * @property horzVal
    * @type {Number}
    * @default 0
    */
    
    this.horzVal;
    
    /**
    * Value of the vertical position of the joystick
    * top = -1
    * Netural = 0
    * bottom = 1
    * 
    * @property vertVal
    * @type {Number}
    * @default 0
    */
    
    this.vertVal;
    
    this.currPointer;
    
    /**
    * Holds the sprites for the joystick
    * 
    * @property joyStick
    * @type {Phaser.Group}
    */
    
    this.joyStick = this.game.add.group();
    
    /**
    * Returns the horizontal value of the joystick when used with a keyboard
    * -desktopMax to 0 = -1 - 0 (left arrow key)
    * 0 = 0
    * 0 to desktopMax = 0 - 1 (right arrow key)
    *
    * @property desktopHorz
    * @type {Number}
    */
    
    this.desktopHorz = 0;
    
    /**
    * Returns the vertical value of the joystick when used with a keyboard
    * -desktopMax to 0 = -1 - 0 (up arrow key)
    * 0 = 0
    * 0 to desktopMax = 0 - 1 (down arrow key)
    *
    * @property desktopVert
    * @type {Number}
    */
    
    this.desktopVert = 0;
    
    this.create();
        	
};

Joystick.prototype = {
	
    /**
    * Preload images of the joystick 
    *
    * @method preload
    */
    
	preload: function () {},
    
    /**
    * Create the joystick 
    *
    * @method create
    */
    
	create: function () 
	{
        //create the base
		this.base = this.game.add.sprite(this.xPos,this.yPos,'base');
        //Set the base anchor to the middle of the sprite
        this.base.anchor.setTo(0.5,0.5);
        this.joyStick.add(this.base);
        
        //Get the radius of the Base
        this.radius = (this.base.width/2);
        
        //create the stick
		this.stick = this.game.add.sprite(this.xPos,this.yPos,'stick');
        this.stick.anchor.setTo(0.5,0.5);
        this.joyStick.add(this.stick);
        
        //position the stick in the center of the base
        this.stick.x = this.base.x;
        this.stick.y = this.base.y;
                
        //Check to see what type of input is used to move the stick
        if(this.game.device.desktop)
        {
            this.cursors = this.game.input.keyboard.createCursorKeys();
        }
        		
	},
    
    /**
    * Update the joystick 
    *
    * @method update
    */
    render: function()
    {
        this.game.debug.spriteBounds(this.base);
        this.game.debug.spriteBounds(this.stick);
    },
	update: function () {
                
        //Check the input type for the joystick        
        switch (this.game.device.desktop)
        {
            case true:
                                
                if(this.cursors.left.isDown && (this.desktopHorz > (this.desktopMax*-1)))
                {
                    this.desktopHorz -= this.stickSpeed;

                }
                else if(this.cursors.right.isDown && (this.desktopHorz < this.desktopMax))
                {
                    this.desktopHorz += this.stickSpeed;
                }

                if(this.cursors.up.isDown && (this.desktopVert > (this.desktopMax*-1)))
                {
                    this.desktopVert -= this.stickSpeed;
                }
                else if(this.cursors.down.isDown && (this.desktopVert < this.desktopMax))
                {
                    this.desktopVert += this.stickSpeed;
                }
                
                if( !this.cursors.left.isDown &&
                    !this.cursors.right.isDown &&
                    !this.cursors.up.isDown &&
                    !this.cursors.down.isDown)
                {
                    this.desktopHorz = 0;
                    this.desktopVert = 0;
                }
                
                this.horzVal = this.desktopHorz/this.desktopMax;
                this.vertVal = this.desktopVert/this.desktopMax;
                
                break;
            case false:
                this.currPointer = (this.game.input.pointer1.x <= (game.world.width/2))?this.game.input.pointer1:this.game.input.pointer2;                
                this.movable = this.limit(this.base.x,this.base.y,this.currPointer.x,this.currPointer.y,(this.radius-this.adjustRadius));
                this.stickPos = this.inputTouch(this.movable);
                
                //Move the stick to where it needs to be
                this.stick.x = this.stickPos.x;
                this.stick.y = this.stickPos.y;

                //Get the values of the positions
                this.horzVal = this.clamp((Math.floor(100*((this.stick.x - this.base.x)/(this.radius-this.adjustRadius))))/100);
                this.vertVal = this.clamp((Math.floor(100*((this.stick.y - this.base.y)/(this.radius-this.adjustRadius))))/100);
                break;
        }
        
        
            
	},
    
    /**
    * Clamps the values of the horz and vert position between -1 to 1
    *
    * @method clamp
    */
    
    clamp: function(n)
    {
        return Math.min(Math.max(n, -1), 1);
    },
    
    /**
    * Controls the movement of the stick from the touch
    *
    * @method inputTouch
    */
    
    inputTouch: function (movable)
    {
        var xPos = this.stick.x;
        var yPos = this.stick.y;

        if(movable.up && movable.down && movable.left && movable.down && this.currPointer.active)
        {
            xPos = this.currPointer.x;
            yPos = this.currPointer.y;
        }
        
        if(!this.currPointer.active && this.snapBack)
        {
            xPos = this.base.x;
            yPos = this.base.y;
        }

        return {x:xPos,y:yPos};   
    },
    
    /**
    * Controls the movement of the stick from the mouse
    *
    * @method inputMouse
    */
    
    inputMouse: function(movable)
    {
        var xPos = this.stick.x;
        var yPos = this.stick.y;

        if(movable.up && movable.down && movable.left && movable.down && this.game.input.mousePointer.isDown)
        {
            xPos = this.game.input.activePointer.x - (this.stick.width/2);
            yPos = this.game.input.activePointer.y - (this.stick.height/2);
        }
        
        if(!this.game.input.mousePointer.isDown && this.snapBack)
        {
            xPos = this.base.x - (this.stick.width/2);
            yPos = this.base.y - (this.stick.height/2);
        }
        
        return {x:xPos,y:yPos};

    },
	
    /**
    * Limits the position of the stick inside of the base 
    *
    * @method limit
    */
    
    limit: function(x1, y1, x2, y2,radius)
    {
        //the vector between the two points
        var dx = x2 - x1,
            dy = y2 - y1,
            distanceSquared = (dx * dx) + (dy * dy);
                        
            if (distanceSquared <= radius * radius) {
                return { up: true, down: true, right: true, left: true };
            } else {
                var distance = Math.sqrt(distanceSquared),
                    ratio = radius / distance;
                                
                return {
                    up: (dy > 0), 
                    down: (dy < 0), 
                    right: (dx < 0), 
                    left: (dx > 0)
                }
            }
    },
    fixToCamera: function()
    {
        this.joyStick.fixedToCamera = true;
    },
    
    /**
    * returns the horizontal value of the stick
    *
    * @method getHorzVal
    */
    
    getHorzVal: function()
    {
        return this.horzVal;
    },
    
    /**
    * returns the vertical value of the stick
    *
    * @method getVertVal
    */
    
    getVertVal: function()
    {
        return this.vertVal;
    },
    
    /**
    * returns the joystick group
    *
    * @method getJoystick
    */
    
    getJoystick: function()
    {
        return this.joyStick;
    },
    
    /**
    * sets the Joystick group alpha to 1
    *
    * @method showJoystick
    */
    
    showJoystick: function()
    {
        this.joyStick.alpha = 1;
    },
    
    /**
    * sets the Joystick group alpha to 0
    *
    * @method hideJoystick
    */
    
    hideJoystick: function()
    {
        this.joyStick.alpha = 0;
    }
	
};
    
})();
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

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Creates a parallax scrolling background
 *
 * @class Parallax
 * @game {Phaser Game} Reference to the Phaser game
 */

(function() {

    /**
     * Creates a parallax scrolling background 
     *
     * @method Parallax
     * @param {game} Reference to the current game
     */

    Parallax = function(game) {
        /**
         * Reference to the current game
         * 
         * @property game
         * @type {Object}
         */

        this.game = game;

        /**
         * Holds the images for the parallax scrolling
         * 
         * @property paraImages
         * @type {Array}
         */

        this.paraImages = [];

        /**
         * Holds the width of the image
         * 
         * @property imageWidth
         * @type {Array}
         */

        this.imageWidth = [];

        /**
         * Holds image that is the benchmark image
         * this is the image that determins the speed of all the other images
         * 
         * @property bench
         * @type {image}
         */

        this.bench = null;

        /**
         * Holds the adjusted speed for each image
         * based on the benchmark image
         *
         * @property sA
         * @type {Array}
         */

        this.sA = [];
    };

    /**
     * Add an image to the parallax
     *
     * @method add
     * @param {image} Sprite to move
     * @param {isBench} Tells function to use this image as the benchmark
     * @param {pref} Preferences for the Parallax
     */

    Parallax.prototype.add = function(image, isBench, pref) {
        //Preferences for the joystick
        this.pref = pref;

        if (this.pref === undefined) {
            this.pref = {};
        }

        //horizontally tiles the image
        this.tile = (this.pref.hasOwnProperty("tile")) ? this.pref.tile : 1;

        //adjusts the speed of the image
        this.Ypos = ((this.pref.hasOwnProperty("y")) ? this.pref.y : 0);

        //Creates the group to hold the tiled images
        if (this.tile > 1) {
            //creates the group
            this.group = game.add.group();

            //put the images in the group
            this.group.createMultiple(this.tile, image, 1, true);

            //layout the images in the group
            for (count = 0; count < this.group.length; count++) {
                this.group.getAt(count).x = this.group.getAt(0).width * count;
                this.group.getAt(count).y = this.Ypos;
            }

            //put the group in the paraImages array
            this.paraImages[this.paraImages.length] = this.group;
            //put the width of the group in the imageWidth array (can remove this when Phaser adds functionality to get the width of a group)
            this.imageWidth.push(this.group.getAt(0).width * this.tile);
        } else {
            this.paraImages[this.paraImages.length] = this.game.add.sprite(0, this.Ypos, image);
            this.imageWidth.push(this.paraImages[this.paraImages.length - 1].width);
        }

        this.paraImages[this.paraImages.length - 1].fixedToCamera = true;

        //If this is the benchmark image, put it in the banch
        if (isBench) {
            this.benchImage = this.paraImages[this.paraImages.length - 1];
            this.bench = this.imageWidth[this.imageWidth.length - 1];
        }

    };

    /**
     * Move the images on the X access
     *
     * @method update
     */

    Parallax.prototype.update = function() {

        for (count = 0; count < this.paraImages.length; count++) {
            v = ((this.imageWidth[count] - this.game.camera.width) / (this.bench - this.game.camera.width));

            this.paraImages[count].cameraOffset.x = (-1 * this.game.camera.x) * v;

        }
    };

    /**
     * Move the images on the X access
     *
     * @method getBench
     * @return returns the image that is set as the bench image
     */

    Parallax.prototype.getBench = function() {
        return this.benchImage;
    };

})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the game states
*
* @class Game.State
*/

(function () {

	/**
	* Creates reference to Game.State 
	*
	* @method Game.State
	*/
	
	Game.State = function () 
	{};
	
})();
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
/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds all of the code for the play state of the game
 *
 * @class Game.State.Play
 */

(function() {

    Game.preloadItems.push({ type: "font", name: "mainFont", path: "assets/fonts/font.png", xml: "assets/fonts/font.fnt" });

    Game.preloadItems.push({ type: "image", name: "layer0", path: "assets/images/landscape/layer0.png" });
    Game.preloadItems.push({ type: "image", name: "layer1", path: "assets/images/landscape/layer1.png" });
    Game.preloadItems.push({ type: "image", name: "layer2", path: "assets/images/landscape/layer2.png" });
    Game.preloadItems.push({ type: "image", name: "layer3", path: "assets/images/landscape/layer3.png" });

    Game.preloadItems.push({ type: "json", name: "levelData", path: "assets/data/levels/level01.json" });

    Game.State.Play = function(game) {

        /**
         * A reference to the currently running Game.
         * 
         * @property game
         * @type {Object}
         */

        this.game = game;

        /**
         * Holds the code for the rocket (the hero ship)
         * 
         * @property rocket
         * @type {Object}
         */

        this.rocket = null;

        /**
         * Holds the max life of the rocket
         * 
         * @property rocketMaxLife
         * @type {Number}
         */

        this.rocketMaxLife = null;

        /**
         * Holds the rocketCurrentLife life of the rocket
         * 
         * @property rocketCurrentLife
         * @type {Number}
         */

        this.rocketCurrentLife = null;

        /**
         * Holds the code for the parallax controls
         * 
         * @property parallax
         * @type {Object}
         */

        this.parallax = null;

        /**
         * Holds the code for the gameInterface
         * 
         * @property gameInterface
         * @type {Object}
         */

        this.gameInterface = null;

        /**
         * Holds the frame sprite
         * 
         * @property gameInterface
         * @type {Phaser.Sprite}
         */

        this.frame = null;

        /**
         * Holds the max number of humans for this level
         * 
         * @property numOfHumans
         * @type {Number}
         */

        this.numOfHumans = null;

        /**
         * Phaser Group for all the humans sprites
         * 
         * @property humanGroup
         * @type {Phaser.Group}
         */

        this.humanGroup = null;

        /**
         * Holds the max number of enemy ships for this level
         * 
         * @property numOfEnemies
         * @type {Number}
         */

        this.numOfEnemies = null;

        /**
         * Phaser group for all the enemy ships sprites
         * 
         * @property enemyGroup
         * @type {Phaser.Group}
         */

        this.enemyGroup = null;

        /**
         * Holds the motherShip sprite
         * 
         * @property motherShip
         * @type {Phaser.Sprite}
         */

        this.motherShip = null;

        /**
         * Holds the intro animation stage
         * 
         * @property levelStage
         * @type {String}
         */

        //this.levelStage = "camToMom";
        this.levelStage = "showRocket";

        /**
         * Holds the wait time between the firing of bullets
         * 
         * @property bulletTime
         * @type {Number}
         */

        this.bulletTime = 0;

        /**
         * Phaser group for all the bullet sprites
         * 
         * @property bullets
         * @type {Phaser.Group}
         */

        this.bullets = null;

        /**
         * Holds the current bullet to be fired
         * 
         * @property bullet
         * @type {Phaser.Sprite}
         */

        this.bullet = null;

        /**
         * Holds the current score of the game
         * 
         * @property score
         * @type {Number}
         */

        this.score = null;

        /**
         * Holds the maximum amount of the rockets shield power (the higher the number the longer the shield can stay on)
         * 
         * @property maxShieldPower
         * @type {Number}
         */

        this.maxShieldPower = null;

        /**
         * Holds the current amount of the rockets shield power
         * 
         * @property shieldPower
         * @type {Number}
         */

        this.shieldPower = this.maxShieldPower;

        /**
         * Holds how fast the shield power drains (the higher the number the faster the shield drains)
         * 
         * @property shieldDrain
         * @type {Number}
         */

        this.shieldDrain = null;

        /**
         * Holds the number when the power blast is fully charged (the higher the number the longer it takes to drain)
         * 
         * @property powerBlastChargedAt
         * @type {Number}
         */

        this.powerBlastChargedAt = null;

        /**
         * Holds the current strength of the power blast
         * 
         * @property powerBlastAmount
         * @type {Number}
         */

        this.powerBlastAmount = this.powerBlastChargedAt;

        /**
         * Holds how fast the enemy ships move (The higher the number the faster they move)
         * 
         * @property enemySpeed
         * @type {Number}
         */

        this.enemySpeed = null;

        /**
         * Holds how fast the enemy ship speed increases when the rocket kills a certain amount of ships
         * 
         * @property enemySpeedIncrease
         * @type {Number}
         */

        this.enemySpeedIncrease = null;

        /**
         * Holds the max number of health points for the enemy ship
         * 
         * @property enemyMaxHealth
         * @type {Number}
         */

        this.enemyMaxHealth = null;

        /**
         * Holds the action that is taken when the top button of the button pad is pressed
         * 
         * @property topAction
         * @type {Object}
         */

        this.topAction = null;

        /**
         * Holds the action that is taken when the bottom button of the button pad is pressed
         * 
         * @property bottomAction
         * @type {Object}
         */

        this.bottomAction = null;

        /**
         * Holds the action that is taken when the right button of the button pad is pressed
         * 
         * @property rightAction
         * @type {Object}
         */

        this.rightAction = null;

        /**
         * Holds the action that is taken when the left button of the button pad is pressed
         * 
         * @property leftAction
         * @type {Object}
         */

        this.leftAction = null;

        /**
         * Holds the action that is taken when the center button of the button pad is pressed
         * 
         * @property centerAction
         * @type {Object}
         */

        this.centerAction = null;

        /**
         * Holds the number that tells the game how often to check if there are enough enemy ships in the game (the higher the number the longer it takes)
         * 
         * @property checkUFOCountTime
         * @type {Number}
         */

        this.checkUFOCountTime = null;

        /**
         * This is a multiple of the screen size to determin how long the level is.
         * If the camara width is 1000 than a levelLength of 2 would equate to 2000
         *
         * @property levelLength
         * @type {Number}
         */

        this.levelLength = null;

        /**
         * The speed that the mother ship moves accross the screen
         *
         * @property motherShipSpeed
         * @type {Number}
         */

        this.motherShipSpeed = null;

        /**
         * The amount of damage a single hit from a laser hit well do to an enemy
         *
         * @property laserDamageRate
         * @type {Number}
         */

        this.laserDamageRate = null;

        /**
         * The amount of damage a single hit from a shield hit well do to an enemy
         *
         * @property shieldDamageRate
         * @type {Number}
         */

        this.shieldDamageRate = null;

        /**
         * The amount of damage the a single hit from the power blast well do to an enemy
         *
         * @property powerBlastDamageRate
         * @type {Number}
         */

        this.powerBlastDamageRate = null;

        /**
         * The amount of damage a single hit from the rocket well do to an enemy when they collide
         *
         * @property rocketDamageRate
         * @type {Number}
         */

        this.rocketDamageRate = null;

        /**
         * The Y position of the ground
         *
         * @property groundLevel
         * @type {Number}
         */

        this.groundLevel = null;


    };

    /**
     * Create and instantiate all the items needed for the game 
     *
     * @method create
     */

    Game.State.Play.prototype.create = function() {
        //Allow the calculation of FPSs
        this.game.time.advancedTiming = true;

        //Create the parallax object
        this.parallax = new Parallax(this.game);

        //Set this level params
        this.setLevelParams();

        //Start the game physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //set the bounds of the world
        // this.game.world.setBounds(0, 0, (1024 * (4 * this.levelLength)), 672);
        this.game.world.setBounds(0, 0, (1269 * (4 * this.levelLength)), 672);

        //Create the background
        this.createBackground();

        //Set how far the humans should be spaced apart
        this.setFriendSpacing(this.game.world.width / (this.numOfHumans + 1));

        //create friends group
        this.friendGroup = this.game.add.group();
        this.friendGroup.enableBody = true;
        this.friendGroup.physicsBodyType = Phaser.Physics.ARCADE;

        //create UFOs group
        this.enemyGroup = this.game.add.group();
        this.enemyGroup.enableBody = true;
        this.enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

        //Create Mothership
        this.mothership = new Game.MotherShip(this);
        game.add.existing(this.mothership);
        this.game.physics.arcade.enable(this.mothership, Phaser.Physics.ARCADE);

        //Add the game interface
        this.gameInterface = new GameInterface(this.game, 2, true);
        //Fix the game interface to the camara
        this.gameInterface.fixedToCamera();

        //Create the bullet group
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (count = 0; count <= 30; count++) {
            this.laser = new Game.Rocket.Laser(this);
            this.laser.setDamageRate(this.laserDamageRate);
            this.laser.kill();
            this.bullets.add(game.add.existing(this.laser));
        }

        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        //Create the group that will hold all the rockets weapons and shields (anything from the rocket the kills the enemy ships)
        this.weaponGroup = this.game.add.group();
        this.weaponGroup.enableBody = true;
        this.weaponGroup.physicsBodyType = Phaser.Physics.ARCADE;

        //Add Rocket powerblast
        this.powerBlast = new Game.Rocket.powerBlast(this);
        this.powerBlast.setDamageRate(this.powerBlastDamageRate);
        game.add.existing(this.powerBlast);
        this.powerBlast.hide();

        //Add the power blast to the weapon group
        this.weaponGroup.add(this.powerBlast);

        //Assign the powerblast to the right button
        this.rightAction = this.powerBlast;

        //Add Rocket shield
        this.shield = new Game.Rocket.shield(this);
        this.shield.setDamageRate(this.shieldDamageRate);
        game.add.existing(this.shield);
        this.shield.hide();

        //Add the shield to the weapon group
        this.weaponGroup.add(this.shield);

        //assign the shield to the left button
        this.leftAction = this.shield;

        //Add Rocket
        this.rocket = new Game.Rocket(this);
        this.rocket.health = this.heroMaxLife;
        this.rocket.setDamageRate(this.rocketDamageRate);
        game.add.existing(this.rocket);
        this.game.physics.arcade.enable(this.rocket, Phaser.Physics.ARCADE);

        //Create the humans
        this.createMultiFriends(this.numOfHumans);

        //Create the enemy ships
        this.createMultiEnemies(this.numOfEnemies, Game.EnemySaucer);

        //Check to see if a new UFO is needed 
        this.game.time.events.loop(this.checkUFOCountTime, this.checkUFOcount, this);

        //Set to true to run game debuging features
        Game.debug = false;

    };

    /**
     * Define all the levels parameters. 
     * These can be adjusted to set the dificulty of the level
     *
     * @method setLevelParams
     */

    Game.State.Play.prototype.setLevelParams = function() {

        var thisLevelData = this.game.cache.getJSON('levelData');

        console.log("powerBlastChargedAt: " + thisLevelData.levelLength);

        //sets the size of the level
        this.levelLength = parseFloat(thisLevelData.levelLength);

        //Total number of enemies
        this.numOfEnemies = 7; 

        //Total number of humans
        this.numOfHumans = parseFloat(thisLevelData.numOfHumans);

        //Set base speed of the UFOs
        this.UFOSpeed = parseFloat(thisLevelData.UFOSpeed);

        //holds the score of the game (total number of UFO kills)
        this.score = parseFloat(thisLevelData.score);

        //the max power of the shield (the higher the number the longer the shield can be on)
        this.maxShieldPower = parseFloat(thisLevelData.maxShieldPower);

        //Holds the current shield power
        this.shieldPower = this.maxShieldPower;

        //How fast the sheild is drained at (the higher the number the faster it's drainined)
        this.shieldDrain = parseFloat(thisLevelData.shieldDrain);

        //the amount the power blaster is fully charged at (the higher the number the longer it takes to full power)
        this.powerBlastChargedAt = parseFloat(thisLevelData.powerBlastDamageRate);

        //Holds the power blast current amount
        this.powerBlastAmount = this.powerBlastChargedAt;

        //when this.UFOkillCount == this.numOfEnemies the UFOs get faster
        this.UFOkillCount = parseFloat(thisLevelData.UFOkillCount);

        //THe amount the UFOs increase there speed by
        this.ufoSpeedIncrease = parseFloat(thisLevelData.ufoSpeedIncrease);

        //set the heros max life level
        this.heroMaxLife = parseFloat(thisLevelData.heroMaxLife);

        //Set the amount of health for the enemy ships
        this.enemyMaxHealth = parseFloat(thisLevelData.enemyMaxHealth);

        //set damage rate for the laser
        this.laserDamageRate = parseFloat(thisLevelData.laserDamageRate);

        //set damage rate for the shield
        this.shieldDamageRate = parseFloat(thisLevelData.shieldDamageRate);

        //set damage rate for the power blaster
        this.powerBlastDamageRate = parseFloat(thisLevelData.powerBlastDamageRate);

        //set damage rate for the rocket
        this.rocketDamageRate = parseFloat(thisLevelData.rocketDamageRate);

        //set the heros current life level
        this.heroCurrentLife = this.heroMaxLife;

        //Set UFO check time
        this.checkUFOCountTime = parseFloat(thisLevelData.checkUFOCountTime);

        //The speed the mother ship moves
        this.motherShipSpeed = parseFloat(thisLevelData.motherShipSpeed);

        //Set the ground level
        this.groundLevel = 520;

    };

    /**
     * The main update loop of the game  
     *
     * @method update
     */

    Game.State.Play.prototype.update = function() {
        //Checks to see if we are running the intro animation or playing the game
        if (this.levelStage != "play") {
            this.introAnimation();
        } else {

            //Increase the shield power
            if (this.shieldPower < this.maxShieldPower) {
                this.shieldPower++;
                this.gameInterface.setShieldMessage(Math.round((this.shieldPower / this.maxShieldPower) * 100));
            }

            //increase the powerBlast
            if (this.powerBlastAmount < this.powerBlastChargedAt) {
                this.powerBlastAmount++;
                this.gameInterface.setPowerBlasterMessage(Math.round((this.powerBlastAmount / this.powerBlastChargedAt) * 100));
            }
        }

        //Update the parallax images
        this.parallax.update();

        //Update the game interface
        this.gameInterface.update();

        //If the right button is clicked fire the check to see if the power blast can be fired
        if (this.gameInterface.buttonPad.checkRight()) {
            this.rightAction.activate();
        } else {
            this.rightAction.deactivate();
        }

        //If the left button is clicked, check to see if the shield can be used.
        if (this.gameInterface.buttonPad.checkLeft()) {
            this.leftAction.activate();
        } else {
            this.leftAction.deactivate();
        }

        //Fires a bullet if the middle button (or s) is pressed
        if (this.gameInterface.buttonPad.checkCenter()) {
            this.fireWeapon();
        }

        //Checks if a bullet and UFO collide
        this.game.physics.arcade.overlap(this.bullets, this.enemyGroup, this.collisionHandler, null, this);

        //Checks if human and UFO collied
        this.game.physics.arcade.overlap(this.friendGroup, this.enemyGroup, this.backToShip, null, this);

        //Checks if UFO and Mother ship collied
        this.game.physics.arcade.overlap(this.mothership, this.enemyGroup, this.enemyHome, null, this);

        //Checks if UFO and the Rocket collied
        this.game.physics.arcade.overlap(this.rocket, this.enemyGroup, this.rocketCollision, null, this);

        //Checks if a weapon and UFOs collied
        this.game.physics.arcade.overlap(this.weaponGroup, this.enemyGroup, this.weaponCollision, null, this);

        //Checks if hero ship hits the mother ship
        this.game.physics.arcade.overlap(this.rocket, this.mothership, this.rocketMotherCollision, null, this);

        this.gameInterface.setFPSMessage(this.game.time.fps);

    };

    /**
     * The main render loop  
     *
     * @method render
     */

    Game.State.Play.prototype.render = function() {

        if (Game.debug) {

            this.game.debug.cameraInfo(this.game.camera, 32, 32);

            this.game.debug.pointer(game.input.mousePointer);
            this.game.debug.pointer(game.input.pointer1);
            this.game.debug.pointer(game.input.pointer2);
            this.game.debug.pointer(game.input.pointer3);

        }

    };

    /**
     * Check to see if there are enough enemy ships in the game  
     *
     * @method checkUFOcount
     */

    Game.State.Play.prototype.checkUFOcount = function() {
        //Get the first dead enemy
        reviveMe = this.enemyGroup.getFirstDead();

        //If there is a dead enemy revive it.
        if (reviveMe) {
            this.reviveEnemy(reviveMe);
        }
    };

    /**
     * Allows the rocket to fire a bullet  
     *
     * @method fireWeapon
     */

    Game.State.Play.prototype.fireWeapon = function() {
        //  To avoid them being allowed to fire too fast we set a time limit
        if (this.game.time.now > this.bulletTime) {
            this.rocket.fireWeapon();

            //Reset the bullet time so we can shoot another
            this.bulletTime = game.time.now + 400;
        }

    };

    /**
     * Creates the background using the parallax class  
     *
     * @method createBackground
     */

    Game.State.Play.prototype.createBackground = function() {
        //Add the images to the background
        this.parallax.add("layer0", false);
        this.parallax.add("layer1", false, { tile: this.levelLength });
        this.parallax.add("layer2", false, { tile: this.levelLength });
        this.parallax.add("layer3", true, { tile: this.levelLength });

        //Add the frame to the background
        this.frame = this.game.add.sprite(0, 0, 'frame');
        this.frame.fixedToCamera = true;
    };

    /**
     * Quits the game  
     *
     * @method quitGame
     */

    Game.State.Play.prototype.quitGame = function(pointer) {

        this.game.state.start('MainMenu', true, false);

    };

    /**
     * Controls the sprites for the level intro animation 
     *
     * @method introAnimation
     */

    Game.State.Play.prototype.introAnimation = function() {

        if (this.rocket.x < ((this.game.camera.width / 2))) {

            this.rocket.x += 10;
        } else {
            this.levelStage = "play";
            //this.game.physics.p2.enable(this.rocket.getSprite());
            this.game.camera.follow(this.rocket);
        }
    };

})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Holds all of the code for the collisions of the game
* This is NOT a class, I just seperated out the collision code for orgnization
*
* @class Game.State.Play.collisions
*/

(function () {
   	
	
	/**
	* Manages the collisions between the weaponGroup and the enemyGroup 
	*
	* @method weaponCollision
	* @param weapon The weapon that was fired
	* @param enemy The enemy that the weapon hit
	*/
	
	 Game.State.Play.prototype.weaponCollision = function(weapon, enemy)
	{
		//Subtract the damage the we get from weapon.getDamageRate() from the enemy (damage() is in the Phaser.Sprite class)
		enemy.onHit(weapon.getDamageRate());

	};
	
	/**
	* Manages the collisions between the rocket and the enemyGroup 
	*
	* @method rocketCollision
	* @param rocke The rocket
	* @param enemy The enemy that the weapon hit
	*/
	
	 Game.State.Play.prototype.rocketCollision = function(rocket, enemy)
	{
		//subtract points from the rockets life		
		rocket.damage(enemy.getDamageRate());
		
		//update the rockets life in the game interface
		this.gameInterface.setHeroLifeMessage(Math.round((rocket.health/this.heroMaxLife)*100));
		
		//Subtract the damage the we get from weapon.getDamageRate() from the enemy (damage() is in the Phaser.Sprite class)
		enemy.onHit(rocket.getDamageRate());
	};
	
	/**
	* Manages the collisions between the rocket and the mother ship 
	*
	* @method rocketMotherCollision
	* @param rocket The rocket
	* @param mother The mother ship
	*/
	
	 Game.State.Play.prototype.rocketMotherCollision = function(rocket, mother)
	{
		//If the shield is off when the rocket hits the Mother Ship, then damage the ship
		if(!this.shield.isShieldOn())
		{
			//Subtract points from the rocket
			rocket.damage(mother.getDamageRate());

			//update the rockets life in the game interface
			this.gameInterface.setHeroLifeMessage(Math.round((rocket.health/this.heroMaxLife)*100));	
		}
	};
	
	/**
	* Manages the collisions between the bulletGroup and the enemyGroup 
	*
	* @method rocketMotherCollision
	* @param bullet The bullet that hit the enemy ship
	* @param{enemy The enemy ship that was hit by the bullet
	*/
	
     Game.State.Play.prototype.collisionHandler = function(bullet, enemy) {
        
        //kill the bullet
        bullet.kill();
        
		//Subtract the damage the we get from weapon.getDamageRate() from the enemy (damage() is in the Phaser.Sprite class)
		enemy.onHit(bullet.getDamageRate());

    };
	
	/**
	* Manages the collision between a human and the enemy ship 
	* This returns the enemy ship back to the mother ship with the human in tow
	*
	* @method backToShip
	* @param human The human
	* @param enemy The enemy ship
	*/
	
     Game.State.Play.prototype.backToShip = function(human,enemy)
    {
		//If the human is on the ground.  If a human is falling then do not allow a UFO to kidnap them
		if(human.y == this.groundLevel)
		{
			//Kill the human
			human.setCurrentState("humanCaptured");

			//Set the state of the UFO to backToMother so the UFO returns to the mother ship
			//We set the name of the sprite to the instance of its enemySaucer object in the this.enemy array, so we can refernce it with enemy["name"]
			enemy.setCurrentState("backToMother");
			//set the hasHuman bool to true
			enemy.switchHasHuman();
			
		}
		
    };
	
	/**
	* Manages the collision between a mother ship and the enemy ship 
	* AFTER the enemy ship has captured a humn
	*
	* @method backToShip
	* @param mothership The mother ship
	* @param enemy The enemy ship that hit the mother ship
	*/
	
     Game.State.Play.prototype.enemyHome = function(motherShip,enemy)
    {
		
		//If the UFO has a human.  
		if(enemy.hasHuman)
		{
			
			//Destroy the human sprite
			enemy.myHuman.destroy();
			
			//Kill the enemy sprite
			enemy.damage(enemy.health);
			enemy.clean();
			enemy.setCurrentState("whatDoIDo");
			
		}
        
    };
	
})();
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
/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * enemySaucers are bad guys that try to kidnap the humans and return them to the mother ship
 *
 * @class Game.EnemySaucer
 * @extends Phaser.Sprite
 * @param game Reference to the current running game
 * @param level Reference to the current running level
 */

(function() {

    //Load the image into the current game
    Game.preloadItems.push({ type: "image", name: "enemySaucer", path: "assets/images/enemySaucer.png" });
    Game.preloadItems.push({ type: "jsonHash", name: "alienSaucer", image: "assets/images/alienSaucer.png", jsonData: "assets/images/alienSaucer.json" });

    Game.EnemySaucer = function(level) {

        /**
         * A reference to the currently running level.
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

        this.damageRate = 10;

        /**
         * The idle state of the enemy ship
         * 
         * @property whatDoIDo
         * @type {Object}
         */

        this.whatDoIDo = new Game.EnemySaucer.Idle(this);

        /**
         * The chase human state of the enemy ship
         * If there a human that does not have a UFO assigned to it, then the UFO will go after it.
         *
         * @property chaseHuman
         * @type {Object}
         */

        this.chaseHuman = new Game.EnemySaucer.ChaseHuman(this);

        /**
         * The chase rocket state of the enemy ship
         * If all trhe humans have an enemy ship assigned to them, then the ship chases the rocket
         *
         * @property chaseRocket
         * @type {Object}
         */

        this.chaseRocket = new Game.EnemySaucer.ChaseRocket(this);

        /**
         * The return to mother ship state of the enemy ship
         * Once the enemy ship has captured a human, it returns to the mother ship
         *
         * @property backToMother
         * @type {Object}
         */

        this.backToMother = new Game.EnemySaucer.BackToMother(this);

        /**
         * Holds the current state of the enemy ship
         *
         * @property currentState
         * @type {Object}
         */

        this.currentState = this.whatDoIDo;

        /**
         * Holds the reference to the rocket
         *
         * @property rocket
         * @type {Phaser.Sprite}
         */

        this.rocket = null;

        /**
         * Does the enemy ship have a human
         * true = this ship has a captured human
         *
         * @property hasHuman
         * @type {bool}
         */

        this.hasHuman = false;

        /**
         * Reference to the human assigned to this enemy ship
         *
         * @property myHuman
         * @type {Phaser.Sprite}
         */

        this.myHuman = null;

        Phaser.Sprite.call(this, this.level.game, this.level.mothership.x, this.level.mothership.y, 'alienSaucer');
        this.anchor.setTo(0.5, 0.5);
        this.name = "enemySaucer";

        //just for testing
        this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        this.frame = 0;

        this.span = (550 - this.level.mothership.y) / 21;

    };

    Game.EnemySaucer.prototype = Object.create(Phaser.Sprite.prototype);
    Game.EnemySaucer.prototype.constructor = Game.EnemySaucer;

    /**
     * Update loop for the enemy ship  
     *
     * @method update
     */

    Game.EnemySaucer.prototype.update = function() {

        //controls which frame to move the spritesheet to;
        var f = (Math.floor(this.y / this.span));

        //If f is larger than the max frame, change it to the max frame
        if (f > 20) {
            f = 20;
        }

        //set the frame
        this.frame = f;

        //Calls the update loop for the currentState
        this.currentState.update();


    };

    /**
     * set the damage rate of this weapon
     *
     * @method getDamageRate
     */

    Game.EnemySaucer.prototype.getDamageRate = function() {
        return this.damageRate;
    };

    /**
     * Tell this enemy ship which human to chase human  
     *
     * @method setHuman
     * @param {human} Reference to the human to chase
     */

    Game.EnemySaucer.prototype.setHuman = function(human) {
        this.myHuman = human;
    };

    /**
     * Send a reference to the rocket to this enemy ship  
     *
     * @method setHero
     */

    Game.EnemySaucer.prototype.setHero = function() {
        this.rocket = this.level.rocket;
    };

    /**
     * Set the current state of this enemy ship  
     *
     * @method setCurrentState
     * @param {state} Reference to the human to chase
     */

    Game.EnemySaucer.prototype.setCurrentState = function(state) {
        this.currentState = this[state];
    };

    /**
     * Set the name of this enemy ship  
     *
     * @method setName
     * @param {name} String vaule of the name
     */

    Game.EnemySaucer.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Switch the bool value  
     *
     * @method switchHasHuman
     */

    Game.EnemySaucer.prototype.switchHasHuman = function() {
        this.hasHuman = !this.hasHuman;
    };

    /**
     * Reset all the enemies ships vars back to their default values  
     *
     * @method clean
     */

    Game.EnemySaucer.prototype.clean = function() {
        this.hasHuman = false;
        this.rocket = null;
        this.myHuman = null;
    };

    /**
     * Called when the enemy ship is created or revived  
     * this assigns the enemy ship to capture a human or if all humans are being chased go after the rocket
     *
     * @method onCreate
     */

    Game.EnemySaucer.prototype.onCreate = function() {
        //If there are no humans to take, then the new UFO will chase the hero
        chaseRocket = true;
        //Loop thru the friends
        for (count = 0; count < this.level.friendGroup.length; count++) {

            //Check if the human already has a UFO assigned to it (null = no UFO assigned)
            if (this.level.friendGroup.getAt(count).ufo === null) {
                //Tell the UFO which human to go after
                this.setHuman(this.level.friendGroup.getAt(count));
                //Tell the human which UFO is chasing him
                this.level.friendGroup.getAt(count).setUFO(this);
                //Set the UFOs update state to chase the human
                this.setCurrentState("chaseHuman");
                //Set chaseRocket to false, so that the UFO goes after the human
                chaseRocket = false;
                //Break out of the loop
                break;
            }

        }

        //If all the humans already have a UFO assigned to them
        if (chaseRocket) {
            //Tell the UFO where the hero is
            this.setHero();
            //Set the UFOs update state to chase the hero
            this.setCurrentState("chaseRocket");
        }

    };

    /**
     * Called when the enemy ship is hit by a weapon  
     *
     * @method onHit
     */

    Game.EnemySaucer.prototype.onHit = function(damage) {
        this.damage(damage);

        //If the hit causes the death of the enemy
        if (!this.alive) {
            //If the UFO is targeting a human
            if (this.myHuman !== null) {
                //Sllow the human to fall back to earth
                this.myHuman.setCurrentState("humanFall");
                //remove the UFO from the human (the humans object is stored in the "myHuman" var in the UFOs object)
                this.myHuman.ufo = null;
            }

            //remove the human if there is one
            this.clean();
            this.setCurrentState("whatDoIDo");

            //IF the user kills the amount of UFOs that are created, then increase the UFOs speed
            if (this.level.UFOkillCount < this.level.numOfEnemies) {
                this.level.UFOkillCount++;
            } else {
                this.level.UFOkillCount = 0;
                this.level.UFOSpeed = (this.level.UFOSpeed * this.level.ufoSpeedIncrease);
            }

            //Add one to the score of the game
            this.level.score++;

            //Update the game interfaces score text
            this.level.gameInterface.setScoreMessage(this.level.score);
        }

    };

})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Return the enemy ship to the mother ship after it has captured a human
*
* @class Game.EnemySaucer.BackToMother
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.BackToMother = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "BackToMother";
	};

	/**
	* Main update function  
	*
	* @method update
	*/
	
	Game.EnemySaucer.BackToMother.prototype.update = function()
	{	
        //Get the mother ship sprite
		this.mothership = this.ufo.level.mothership;
		
		//Get angle from the enemy ship to the mother ship
		var targetAngle = this.ufo.game.math.angleBetween(
			this.ufo.x, this.ufo.y,
			this.mothership.x, this.mothership.y
		);

		//Set the velocity of the enemy ship
        this.ufo.body.velocity.x = Math.cos(targetAngle) * this.ufo.level.UFOSpeed;
		this.ufo.body.velocity.y = Math.sin(targetAngle) * this.ufo.level.UFOSpeed;     

	};

})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Set the enemy ship to chase a human
*
* @class Game.EnemySaucer.ChaseHuman
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.ChaseHuman = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "chaseHuman";
	};

	/**
	* Main update function  
	*
	* @method update
	*/
	
	Game.EnemySaucer.ChaseHuman.prototype.update = function()
	{	
		//Get angle from the enemy ship to the human
		var targetAngle = this.ufo.game.math.angleBetween(
			this.ufo.x, this.ufo.y,
			this.ufo.myHuman.x, this.ufo.myHuman.y
		);

		//Set the velocity of the enemy ship
        this.ufo.body.velocity.x = Math.cos(targetAngle) * this.ufo.level.UFOSpeed;
		this.ufo.body.velocity.y = Math.sin(targetAngle) * this.ufo.level.UFOSpeed;

	};

})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* makes the enemy ship chase the rocket
*
* @class Game.EnemySaucer.ChaseHero
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.ChaseRocket = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "chaseHero";
	};
	
	/**
	* Main update function  
	*
	* @method update
	*/
	
	Game.EnemySaucer.ChaseRocket.prototype.update = function()
	{
		//Get angle from the enemy ship to the rocket
		var targetAngle = this.ufo.game.math.angleBetween(
			this.ufo.x, this.ufo.y,
			 this.ufo.rocket.x,  this.ufo.rocket.y
		);

		//Set the velocity of the enemy ship
		this.ufo.body.velocity.x = Math.cos(targetAngle) * this.ufo.level.UFOSpeed;
		this.ufo.body.velocity.y = Math.sin(targetAngle) * this.ufo.level.UFOSpeed;

	};
	
})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Set the enemy ship to its idle state
*
* @class Game.EnemySaucer.Idle
* @param {ufo} reference to the enemy ship class
*/

(function () {
	
	Game.EnemySaucer.Idle = function(ufo) 
	{
		this.ufo = ufo;

		this.stateName = "idle";
	};

	/**
	* Main update function  
	*
	* @method update
	*/

	Game.EnemySaucer.Idle.prototype.update = function()
	{};
	
})();
/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Create a human in the game
 *
 * @class Game.Human
 * @extends Phaser.Sprite
 * @param {level} current running level
 * @param {orgX} the original X position of the human
 */

(function() {

    //Load the image for the human    
    Game.preloadItems.push({ type: "jsonHash", name: "humans", image: "assets/images/humans.png", jsonData: "assets/images/humans.json" });

    Game.Human = function(level, orgX) {

        /**
         * A reference to the currently level being run.
         * 
         * @property level
         * @type {Object}
         */

        this.level = level;

        /**
         * Holds the original X position of the human
         * 
         * @property orgX
         * @type {Number}
         */

        this.orgX = orgX;

        /**
         * The total range that the human can walk 
         * 
         * @property walkingRange
         * @type {Number}
         */

        this.walkingRange = 400;

        /**
         * Reference to the enemy ship that is chasing this human 
         * 
         * @property ufo
         * @type {Phaser.Sprite}
         */

        this.ufo = null;

        /**
         * State that gets called from the update function when the human is captured by an enemy ship 
         * 
         * @property humanCaptured
         * @type {Object}
         * @param {this} reference to this class
         */

        this.humanCaptured = new Game.Human.Captured(this);

        /**
         * State that gets called from the update function when the human is falling 
         * Happens if the human is captured and then the enemy ship is shot
         *
         * @property humanFall
         * @type {Object}
         * @param {this} reference to this class
         */

        this.humanFall = new Game.Human.Fall(this);

        /**
         * State that gets called from the update function when the human is walking 
         * 
         * @property humanWalking
         * @type {Object}
         * @param {this} reference to this class
         */

        this.humanWalking = new Game.Human.Walking(this);

        /**
         * The current state running 
         * 
         * @property currentState
         * @type {Object}
         * @default humanWalking
         */

        this.currentState = this.humanWalking;

        if (this.level.friendGroup.length > 0) {
            //Create the human sprite
            Phaser.Sprite.call(this, this.level.game, this.orgX, this.level.groundLevel, 'humans');
            //Our two animations, walking left and right.
            this.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 25, true);
            this.animations.add('captured', [0], 25, true);
        } else {
            //Create the human sprite
            Phaser.Sprite.call(this, this.level.game, this.orgX, this.level.groundLevel, 'humans');
            //Our two animations, walking left and right.
            this.animations.add('walk', [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46], 25, true);
            this.animations.add('captured', [20], 25, true);
        }

        this.anchor.setTo(0.5, 0);
        this.name = "human";

    };

    Game.Human.prototype = Object.create(Phaser.Sprite.prototype);
    Game.Human.prototype.constructor = Game.Human;

    /**
     * Update loop for the enemy ship  
     *
     * @method update
     */

    Game.Human.prototype.update = function() {
        this.currentState.update();
    };

    /**
     * Set the state to run in the update function  
     *
     * @method setCurrentState
     * @param {state} the statre to set as the current state
     */

    Game.Human.prototype.setCurrentState = function(state) {
        this.currentState = this[state];
    };

    /**
     * Set the name of the human sprite  
     *
     * @method setName
     * @param {name} the statre to set as the current state
     */

    Game.Human.prototype.setName = function(name) {
        this.name = name;
    };

    /**
     * Set the orginal X position of the human sprite  
     *
     * @method setOrgX
     * @param {orgX} the statre to set as the current state
     */

    Game.Human.prototype.setOrgX = function(orgX) {
        this.orgX = orgX;
    };

    /**
     * Set the UFO that is chasing this human  
     *
     * @method setUFO
     * @param {ufo} Reference to the enemy ship chasing this human
     */

    Game.Human.prototype.setUFO = function(ufo) {
        this.ufo = ufo;
    };

})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* The human action when it is captured by an enemy ship
*
* @class Game.Human.Captured
* @param {human} Reference to the human
*/

(function () {
	
	Game.Human.Captured = function(human) 
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
		
		this.stateName = "humanCaptured";

	};

	/**
	* Update loop for this state  
	*
	* @method update
	*/
	
	Game.Human.Captured.prototype.update = function()
	{
		//Sets the humans x to it's enemy ships x
		this.human.x = this.human.ufo.x;
		
		//Add 50 to the enemy ships y, so that the human falls just below it
		this.human.y = this.human.ufo.y + 50;
		
		//Move the animation to the idle frame
		this.human.animations.play('captured');
		
	};
	
})();
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
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* The human action when it is walking
*
* @class Game.Human.Walking
* @param {human} Reference to the human
*/

(function () {
	
	Game.Human.Walking = function(human) 
	{
		/**
		* Reference to the human 
		* 
		* @property human
		* @type {Phaser.Sprite}
		*/
		
		this.human = human;
		
		/**
		* the direction the human is walking (1 = right, -1 = left) 
		* 
		* @property walkDirection
		* @type {Number}
		*/
		
		this.walkDirection = 1;
		
		/**
		* the name of the current state
		* 
		* @property stateName
		* @type {String}
		*/
		
		this.stateName = "humanWalking";
	};

	/**
	* Update loop for this state  
	*
	* @method update
	*/
	
	Game.Human.Walking.prototype.update = function()
	{

        //Set the animation to walk
		this.human.animations.play('walk');
		
		//Move the human in the direction he is walking
		this.human.x += (1.5 * this.walkDirection);

		//Switch the direction of the human
		if( Math.abs(this.human.orgX - this.human.x) >= (this.human.walkingRange/2))
		{

			this.walkDirection = this.walkDirection * -1;
			this.human.scale.x = this.human.scale.x * -1;

		}

	};
	
	/**
	* Set the direction for the human to walk  
	*
	* @method setDirection
	*/
	
	Game.Human.Walking.prototype.setDirection = function(direction)
	{
		this.walkDirection = direction;
		this.human.scale.x = direction;
	};

})();	
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
/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds all of the code for code that is needed on each level
 *
 * @class Game.Rocket
 * @extends Phaser.Sprite
 * @param {game} Reference to the current running game
 * @param {gameInterface} Reference to the gameInterface class
 */

(function() {

    //Load the rocket image into the game
    Game.preloadItems.push({ type: "image", name: "rocket", path: "assets/images/rocketShip.png" });

    /**
     * Create the rocket
     *
     * @method Game.Rocket
     * @param {game} reference to the current game
     * @param {gameInterface} reference to the gameInterface class
     */

    Game.Rocket = function(level) {

        /**
         * A reference to the currently running game.
         * 
         * @property game
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
         * A reference to the gameInterface class
         * 
         * @property gameInterface
         * @type {Object}
         */

        this.gameInterface = this.level.gameInterface;

        Phaser.Sprite.call(this, this.level.game, 0, (this.level.game.world.height / 2) - 50, 'rocket');
        this.anchor.setTo(0.5, 0.5);
        this.name = "rocket";

    };

    Game.Rocket.prototype = Object.create(Phaser.Sprite.prototype);
    Game.Rocket.prototype.constructor = Game.Rocket;

    /**
     * Main update loop for the rocket
     *
     * @method update
     */

    Game.Rocket.prototype.update = function() {
        //get the horizontal value from the joystick (-1 to 1)
        var horzVal = this.gameInterface.getHorzVal();

        //get the verticle vaule from the joystick (-1 to 1)
        var vertVal = this.gameInterface.getVertVal();

        //flip the ship sprite depending on the direction (left or right) it is moving
        if (horzVal < 0) {
            this.scale.x = -1;
        } else if (horzVal > 0) {
            this.scale.x = 1;
        }

        //Move the ship horizontally
        this.x += horzVal * 15;

        //If the ship moves past 130 on the X axis then bring the ship back to 130
        if (this.x < 130) {
            this.x = 130;
        }

        //If the ship moves past the right bounds of the game, move the ship back to the right edge
        if (this.x > (this.level.game.world.width - (this.width / 2))) {
            this.x = (this.level.game.world.width - (this.width / 2));
        }

        //Move the ship in the verticle direction
        this.y += vertVal * 15;

        //If the ship moves past 50 on the Y axis move the ship back to 50
        if (this.y < 50) {
            this.y = 50;
        }

        //If the ship moves past the bottom bounds of the game, move the ship back to the bottom
        if (this.y > (this.level.game.world.height - (this.height / 2))) {
            this.y = (this.level.game.world.height - (this.height / 2));
        }

    };

    /**
     * Allows the rocket to fire a laser  
     *
     * @method fireWeapon
     */

    Game.Rocket.prototype.fireWeapon = function() {

        //  Grab the first bullet we can from the pool
        bullet = this.level.bullets.getFirstExists(false);

        //Determin the direction of the rocket sprite
        direction = this.scale.x;

        //Everything is multiplied by the "direction" to make sure it moves in the correct direction
        if (bullet) {
            //position the bullet infront of the Rocket
            bullet.reset(this.x + (100 * direction), (this.y - 30));

            //Turn the bullet the right direction
            bullet.scale.x = direction;

            //Move the bullet
            bullet.body.velocity.x = 2400 * direction;
        }

    };

    /**
     * get the damage rate of this weapon
     *
     * @method getDamageRate
     */

    Game.Rocket.prototype.getDamageRate = function() {
        return this.damageRate;
    };

    /**
     * set the damage rate of this weapon
     *
     * @method setDamageRate
     */

    Game.Rocket.prototype.setDamageRate = function(damageRate) {
        this.damageRate = damageRate;
    };
})();
/**
* @author       Ross Lehr <itsme@rosslehr.com>
* @copyright    2014 Ross Lehr
*/

/**
* Creates the rockets laser
*
* @class Game.Rocket.Laser
* @extends Phaser.Sprite
* @param {level} Reference to the current level being played
*/

(function () {
	
	//Loads the laser image
	Game.preloadItems.push({type:"image",name:"bullet",path:"assets/images/bullet.png"});

	Game.Rocket.Laser = function(level) {

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
				
		//Create the shield sprite
		Phaser.Sprite.call(this, this.level.game, 0,0, 'bullet');
		this.anchor.setTo(0,0.5);   
		this.name = "laser";

	};

	Game.Rocket.Laser.prototype = Object.create(Phaser.Sprite.prototype);
	Game.Rocket.Laser.prototype.constructor = Game.Rocket.Laser;
	
	/**
	* Update loop for the enemy ship  
	*
	* @method update
	*/
	
	Game.Rocket.Laser.prototype.update = function() 
	{};
	
	/**
	* Activate the shield  
	*
	* @method activate
	*/
	
	Game.Rocket.Laser.prototype.activate = function()
	{
		
	};
	
	/**
	* deactivate the shield  
	*
	* @method deactivate
	*/
	
	Game.Rocket.Laser.prototype.deactivate = function()
	{};
	
	/**
	* get the damage rate of this weapon
	*
	* @method getDamageRate
	*/
	
	Game.Rocket.Laser.prototype.getDamageRate = function()
	{
		return this.damageRate;
	};
	
	/**
	* set the damage rate of this weapon
	*
	* @method setDamageRate
	*/

	Game.Rocket.Laser.prototype.setDamageRate = function(damageRate)
	{
		this.damageRate = damageRate;
	};
	
})();

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

/**
 * @author       Ross Lehr <itsme@rosslehr.com>
 * @copyright    2014 Ross Lehr
 */

/**
 * Holds all of the code for the game States Preloader
 *
 * @class Game.State.Preloader
 */

(function() {

    /**
     * Creates Preloader state of the game 
     *
     * @method Game.Preloader
     * @param {game} Reference to the current game
     */

    Game.State.Preloader = function(game) {
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

    Game.State.Preloader.prototype.preload = function() {
        //Load the game logo
        this.nonsenseLogo = this.game.add.sprite(0, 0, 'nonsenseLogo');
        this.nonsenseLogo.x = (this.game.width / 2) - (this.nonsenseLogo.width / 2);
        this.nonsenseLogo.y = (this.game.height / 2) - (this.nonsenseLogo.height);

        //load the loader bar
        this.preloadBar = this.game.add.sprite(0, 0, 'preloaderBar');
        this.preloadBar.x = this.nonsenseLogo.x;
        this.preloadBar.y = this.nonsenseLogo.y + this.nonsenseLogo.height;
        this.load.setPreloadSprite(this.preloadBar);

        //load all items in Game.preloadItems array
        for (count = 0; count < Game.preloadItems.length; count++) {
            //Get the type of item in the preloader array
            switch (Game.preloadItems[count].type) {

                case "json":
                    this.game.load.json(Game.preloadItems[count].name, Game.preloadItems[count].path);
                    break;

                case "image":
                    this.game.load.image(Game.preloadItems[count].name, Game.preloadItems[count].path);
                    break;

                case "spriteSheet":
                    this.game.load.spritesheet(Game.preloadItems[count].name, Game.preloadItems[count].path, Game.preloadItems[count].width, Game.preloadItems[count].height, Game.preloadItems[count].frameCount);
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

    Game.State.Preloader.prototype.create = function() {
        //Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;

    };

    /**
     * Start the mainMenu state 
     *
     * @method update
     */

    Game.State.Preloader.prototype.update = function() {

        this.state.start('MainMenu');

    };

})();
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

