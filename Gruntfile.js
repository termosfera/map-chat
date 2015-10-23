var grunt = require("grunt");

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');

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
        }
    });

    grunt.registerTask('dev', [
        'watch'
    ]);

};
