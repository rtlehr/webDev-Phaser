/**
 * Controls how the enemies work as a group
 *
 * @class masterEnemyAI
 * @constructor
 * @param {String} msg A description of...
 * 
 */

(function() {

    masterEnemyAI = function(level) {

        /**
         * A reference to the currently running level.
         * 
         * @property level
         * @type {Object}
         */

        this.level = level;

        /**
         * Holds reference to all the enemies
         * a new multidemensional array is created for each type of enemy
         * 
         * @property enemies
         * @type {Array}
         */

        this.enemies = [];

        /**
         * Holds reference to all the active enemies
         * 
         * @property activeEnemies
         * @type {Array}
         */

        this.activeEnemies = [];

        this.enemySauceIndex = 0;

        this.init();
    };

    masterEnemyAI.prototype.init = function() {
        console.log("Master Enemy AI created");
    }

    /**
     * Adds the enemies to the pool 
     *
     * @method addEnemy
     * @param {enemy} the enemy object that was just created
     */

    masterEnemyAI.prototype.addEnemy = function(enemy, data) {

        var enemyExists = false;

        var lastBirthChance = 0;

        for (var count = 0; count < this.enemies.length; count++) {

            if (this.enemies[count].name == enemy.name) {

                this.enemies[count].enemies.push(enemy);

                this.enemies[count].enemies[this.enemies[count].enemies.length - 1].setAiArrayPos(this.enemies[count].enemies.length - 1);

                enemyExists = true;

                break;

            }

        }

        //create a new enemy reference
        if (!enemyExists) {

            //Create the enemy object and put it in the array
            this.enemies.push({});

            //Set the enemy name
            this.enemies[this.enemies.length - 1].name = enemy.name;

            //Set the enemy type
            this.enemies[this.enemies.length - 1].type = data.type;

            //Set the chance that this enemy is birthed
            this.enemies[this.enemies.length - 1].birthChance = parseFloat(data.birthChance);

            //Set the chance that this enemy is birthed
            this.enemies[this.enemies.length - 1].enemiesAvailable = parseFloat(data.count);

            //Set the low number of the chance
            this.enemies[this.enemies.length - 1].lowBirthChance = lastBirthChance;

            lastBirthChance += parseFloat(data.birthChance);

            //Set the high chance
            this.enemies[this.enemies.length - 1].highBirthChance = lastBirthChance + parseFloat(data.birthChance);

            //Set the condition that needs to be TRUE for the enemy to be birthed
            this.enemies[this.enemies.length - 1].birthCondition = data.birthCondition;

            //Set the time rate an this enemy can be born
            this.enemies[this.enemies.length - 1].birthRate = data.birthRate;

            //Set the enemies AU priority
            this.enemies[this.enemies.length - 1].priority = data.priority;

            //Set the current priority
            this.enemies[this.enemies.length - 1].currentPriority = 0;

            //Create an array to store the enemy classes
            this.enemies[this.enemies.length - 1].enemies = [];

            //Put the enemy class in the array
            this.enemies[this.enemies.length - 1].enemies.push(enemy);

            this.enemies[this.enemies.length - 1].enemies[0].setAiArrayPos(0);

        }

    }

    /**
     * Adds an enemy to the play field based on the birthChance of that enemey 
     *
     * @method birthEnemy
     */

    masterEnemyAI.prototype.chooseEnemyToBirth = function() {

        //Holds enemies that can be birthed
        var e = [];

        console.log("total enemies: " + this.enemies.length);

        //Find enemies who birthConditions are TRUE
        for (var count = 0; count < this.enemies.length; count++) {

            if (eval(this.enemies[count].birthCondition)) {

                e.push(this.enemies[count]);

                console.log("-" + this.enemies[count].name + " is possible.");

            }
        }

        var totalPrecentage = 0;

        //Calculate rate possible enemies can be piked
        //total the precent to be calculated
        for (var count = 0; count < e.length; count++) {

            totalPrecentage += e[count].birthChance;

        }

        console.log("--totalPrecentage " + totalPrecentage);

        var lastBirthChance = 0;

        //reset low and high birth chance
        for (var count = 0; count < e.length; count++) {

            //Set the low number of the chance
            e[count].lowBirthChance = lastBirthChance;

            console.log("---lowBirthChance for " + e[count].name + " : " + e[count].lowBirthChance);

            //Set the high chance
            e[count].highBirthChance = lastBirthChance + ((100 / totalPrecentage) * e[count].birthChance);

            lastBirthChance += (100 / totalPrecentage) * e[count].birthChance;

            console.log("---highBirthChance for " + e[count].name + " : " + e[count].highBirthChance);


        }

        //Pick Random Number
        var birthNumber = (Math.random() * 100) + 1;

        this.birthEnemy();

        /*
        var birthNumber = (Math.random() * 100) + 1;

        console.log("birthNumber: " + birthNumber);

        for (var count = 0; count < this.enemies.length; count++) {

            if (birthNumber >= this.enemies[count].lowBirthChance &&
                birthNumber < this.enemies[count].highBirthChance &&
                //If currentPriotiy is higher than the number of priorities, then do not birth this enemy
                this.enemies[count].currentPriority <= this.enemies[count].priority.length) {
                //birth this enemy
                //remove from this.enemies
                //add to this.ectiveEnemies
                //recalc lowBirthChance and highBirthChance

                this.activeEnemies[count] = null;
                break;
            }
        }
*/

    }

    /**
     * used if a perticular enemy MUST be birthed
     *
     * @method birthEnemy
     */

    masterEnemyAI.prototype.birthEnemy = function(enemy, count) {

        //  Grab the first bullet we can from the pool
        var enemy = this.level.enemyGroup.getChildAt(this.enemySauceIndex++);

        console.log("condition: " + eval(this.enemies[this.enemies.length - 1].birthCondition))

        //Everything is multiplied by the "direction" to make sure it moves in the correct direction
        if (enemy && eval(this.enemies[this.enemies.length - 1].birthCondition)) {

            //position the bullet infront of the Rocket
            enemy.reset(this.level.mothership.x, this.level.mothership.y);

            //Call the onCreate function
            //enemy.onCreate();
            var cP = this.enemies[this.enemies.length - 1].currentPriority;
            enemy[this.enemies[this.enemies.length - 1].priority[cP]]();

        }

        //this.recalcBirthChance();

    };

    /**
     * Adds an enemy to the play field based on the birthChance of that enemey 
     *
     * @method recalcBirthChance
     */

    masterEnemyAI.prototype.recalcBirthChance = function() {

    };


    /**
     * Adds an enemy to the play field based on the birthChance of that enemey 
     *
     * @method recalcBirthChance
     */

    masterEnemyAI.prototype.recalcBirthChance = function() {

    };

    /**
     * Adds an enemy to the play field based on the birthChance of that enemey 
     *
     * @method recalcBirthChance
     */

    masterEnemyAI.prototype.getEnemyShipCount = function() {

    };

    /**
     * Adds an enemy to the play field based on the birthChance of that enemey 
     *
     * @method recalcBirthChance
     */

    masterEnemyAI.prototype.getHumanCount = function() {

    };


})();