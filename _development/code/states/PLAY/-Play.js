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

        console.log("powerBlastChargedAt: " + thisLevelData);

        //sets the size of the level
        this.levelLength = Number(thisLevelData.levelLength);

        //Total number of enemies
        this.numOfEnemies = 7;

        //Total number of humans
        this.numOfHumans = 6;

        //Set base speed of the UFOs
        this.UFOSpeed = 100;

        //holds the score of the game (total number of UFO kills)
        this.score = 0;

        //the max power of the shield (the higher the number the longer the shield can be on)
        this.maxShieldPower = 500;

        //Holds the current shield power
        this.shieldPower = this.maxShieldPower;

        //How fast the sheild is drained at (the higher the number the faster it's drainined)
        this.shieldDrain = 5;

        //the amount the power blaster is fully charged at (the higher the number the longer it takes to full power)
        this.powerBlastChargedAt = 1000;

        //Holds the power blast current amount
        this.powerBlastAmount = this.powerBlastChargedAt;

        //when this.UFOkillCount == this.numOfEnemies the UFOs get faster
        this.UFOkillCount = 0;

        //THe amount the UFOs increase there speed by
        this.ufoSpeedIncrease = 1.25;

        //set the heros max life level
        this.heroMaxLife = 1000;

        //Set the amount of health for the enemy ships
        this.enemyMaxHealth = 100;

        //set damage rate for the laser
        this.laserDamageRate = 100;

        //set damage rate for the shield
        this.shieldDamageRate = 100;

        //set damage rate for the power blaster
        this.powerBlastDamageRate = 100;

        //set damage rate for the rocket
        this.rocketDamageRate = 100;

        //set the heros current life level
        this.heroCurrentLife = this.heroMaxLife;

        //Set UFO check time
        this.checkUFOCountTime = 3000;

        //The speed the mother ship moves
        this.motherShipSpeed = 3;

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