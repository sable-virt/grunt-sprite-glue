/*
 * grunt-sprite-glue
 * https://github.com/frontainer/grunt-sprite-glue
 *
 * Copyright (c) 2014 frontainer
 * Licensed under the MIT license.
 */

'use strict';

var glue = require('./lib/glue');
module.exports = function (grunt) {
    grunt.registerMultiTask('spglue', 'Sprite generator with Glue & Grunt', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});
        var done = this.async();
        var count = 0;
        var files = this.files;
        files.forEach(function (f) {
            // filepathのマッピング
            var src = f.src.filter(function(filepath) {
                return grunt.file.isDir(filepath);
            }).map(function(filepath) {
                return filepath;
            }).join('');

            var command = glue(src, f.dest,options, function(err, stdout, stderr) {
                ++count;
                if (err) {
                    grunt.log.error(err);
                    return done(stderr);
                }
                if (!options.quiet) {
                    grunt.log.writeln(stdout);
                }
                if (count === files.length) {
                    done(stdout);
                    return stdout;
                }
            });
            if (!options.quiet) {
                grunt.log.writeln('Execute: ' + command);
            }
        });
    });
};