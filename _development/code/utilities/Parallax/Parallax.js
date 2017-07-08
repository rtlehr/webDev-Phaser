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