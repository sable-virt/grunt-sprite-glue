/*
 * grunt-sprite-glue
 * https://github.com/frontainer/grunt-sprite-glue
 *
 * Copyright (c) 2014 frontainer
 * Licensed under the MIT license.
 */

'use strict';

require('./tasks/sprite-glue');
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        spglue: {
            dev: {
                options: {
                    project: true,
                    scss: true,
                    img: 'dest/images',
                    css: 'dest/css'
                },
                files: {
                    './dest': 'test'
                }
            },
            dev2: {
                options: {
                    project: true,
                    caat: 'dest/css',
                    img: 'dest/images'
                },
                src: ['test']
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    grunt.registerTask('default', ['spglue:dev']);

};
