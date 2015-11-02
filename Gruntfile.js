var grunt = require("grunt");

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-ngdocs');

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        root: {
            app: 'public/app'
        },
        less: {
            dev: {
                options: {
                    paths: ["<%= root.app %>/styles"]
                },
                files: {
                    "<%= root.app %>/styles/css/stylesheet.css": "<%= root.app %>/styles/less/stylesheet.less"
                }
            }
        },
        watch: {
            css: {
                files: ['<%= root.app %>/styles/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        },
        ngdocs: {
            options: {
                dest: '<%= root.app %>/docs/',
                html5Mode: false
            },
            api: {
                src: [
                    '<%= root.app %>/app.js',
                    '<%= root.app %>/pages/**/*.js',
                    '<%= root.app %>/shared/**/*.js'
                ],
                title: 'Map-chat client'
            }
        }
    });

    grunt.registerTask('doc', [
        'ngdocs'
    ]);

    grunt.registerTask('dev', [
        'ngdocs',
        'watch'
    ]);

};
