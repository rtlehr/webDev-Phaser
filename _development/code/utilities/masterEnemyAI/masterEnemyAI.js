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

    masterEnemyAI.prototype.addEnemy = function(enemy, birthChance, priority) {

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

            this.enemies.push({});

            this.enemies[this.enemies.length - 1].name = enemy.name;

            this.enemies[this.enemies.length - 1].birthChance = parseFloat(birthChance);

            this.enemies[this.enemies.length - 1].lowBirthChance = lastBirthChance;

            lastBirthChance += parseFloat(birthChance);

            this.enemies[this.enemies.length - 1].highBirthChance = lastBirthChance + parseFloat(birthChance);

            this.enemies[this.enemies.length - 1].priority = priority;

            this.enemies[this.enemies.length - 1].currentPriority = 0;

            this.enemies[this.enemies.length - 1].enemies = [];

            this.enemies[this.enemies.length - 1].enemies.push(enemy);

            this.enemies[this.enemies.length - 1].enemies[0].setAiArrayPos(0);


        }

        console.log("enemy: " + this.enemies[this.enemies.length - 1].birthChance);

    }

    /**
     * Adds an enemy to the play field based on the birthChance of that enemey 
     *
     * @method birthEnemy
     */

    masterEnemyAI.prototype.chooseEnemyToBirth = function() {

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

    }

    /**
     * used if a perticular enemy MUST be birthed
     *
     * @method fourceBirthEnemy
     */

    masterEnemyAI.prototype.birthEnemy = function(enemy, count) {

        this.recalcBirthChance();

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