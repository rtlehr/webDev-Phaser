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