var grunt = require("grunt");

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');

module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        root: {
            app: './public/app'
        },
        less: {
            dev: {
                options: {
                    paths: ["<%= root.app %>/assets/less/"]
                },
                files: {
                    "./public/app/assets/styles/custom.css": "<%= root.app %>/assets/less/custom.less"
                }
            }
        },
        watch: {
            css: {
                files: ['<%= root.app %>/assets/less/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('build-dev', [
        'less'
    ]);

    grunt.registerTask('dev', [
        'watch'
    ]);

};
