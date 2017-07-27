/**
 *  Web Dev Grunt.js Documentation
 *
 * @class Grunt.js
 */

module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('assemble-less');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-json-minification');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            //Checks for when a .LESS (style sheet) changes and then runs ''less'
            applicationLESS: {
                files: '_development/css/module-mediaQueries/*.less',
                tasks: ['less:application'],
                options: {}
            },
            applicationMin: {
                files: ['_production/assets/css/application.css'],
                tasks: ['cssmin:application'],
                options: {}
            },
            applicationJsConcat: {
                files: ['_development/code/**/*.js'],
                tasks: ['concat:application']
            },
            applicationUglify: {
                files: ['_production/assets/js/application.js'],
                tasks: ['uglify:application']
            },
            dataUglify: {
                files: ['_development/data/*/**.json'],
                tasks: ['json_minification']
            }
        },
        /**
         *    Converts LESS code to CSS code
         *
         *    @method less
         **/
        less: {
            application: {
                options: {
                    paths: '_development/css/libs',
                    imports: {
                        less: ['styleGuide.less', '_development/css/libs/mixins.less', '_development/css/libs/layout.less']
                    }
                },
                files: {
                    '_production/assets/css/application.css': '_development/css/application.less'
                }
            }
        },
        /**
         *    Minifies all of the CSS files
         *
         *    @method cssmin
         **/
        cssmin: {
            application: {
                files: {
                    '_production/assets/css/application.min.css': ['_production/assets/css/application.css'],
                }
            }
        },
        /**
         *    Minifies the application.js file
         *
         *    @method uglify
         **/
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery'],
                    beautify: true
                }
            },
            application: {
                files: {
                    '_production/assets/js/game.min.js': ['_production/assets/js/game.js']
                }
            }
        },
        /**
         *    Combines all of the .js files and saves them as application.js
         *
         *    @method concat
         **/
        concat: {
            options: {
                separator: '\n'
            },
            //Copy (change) this information to match the name of the ALLAX file you are creating
            application: {
                src: ['_development/code/Game.js',
                    '_development/code/utilities/**/*.js',
                    '_development/code/states/**/*.js',
                    '_development/code/startGame.js'
                ],
                dest: '_production/assets/js/game.js',
                nonull: true,
            }
        },
        jsbeautifier: {
            files: ["_development/code/**/*.js", "GruntFile.js", "_production/*.html"],
            options: {
                js: {
                    indentWithTabs: true
                }

            }
        },
        json_minification: {
            target: {
                files: [{
                    expand: true,
                    cwd: '_development/data',
                    src: ['*/**.json'],
                    dest: '_production/assets/data',
                    ext: '.json'
                }]
            }
        }

    });

    // Default task.
    //grunt.registerTask('default', ['less','concat','uglify','cssmin','watch']);
    grunt.registerTask('default', ['less', 'cssmin', 'concat', 'uglify', 'json_minification', 'watch']);

};