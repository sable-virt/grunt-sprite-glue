/*
 * grunt-sprite-glue
 * https://github.com/frontainer/grunt-sprite-glue
 *
 * Copyright (c) 2014 frontainer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var COMMANDS = {
        algorithm: '--algorithm=%val%',
        crop: '--crop',
        caat: '--caat',
        cachebuster: '--cachebuster',
        cachebusterFilename: '--cachebuster-filename',
        cachebusterFilenameOnlySprites: '--cachebuster-filename-only-sprites',
        cocos2d: '--cocos2d',
        css: '--css=%val%',
        img: '--img=%val%',
        cssTemplate: '--css-template=%val%',
        force: '--force',
        followLinks: '--follow-links',
        html: '--html',
        json: '--json',
        jsonFormat: '--json-format=%val%',
        less: '--less',
        lessTemplate: '--less-template',
        margin: '--margin',
        namespace: '--namespace=%val%',
        noImg: '--no-img',
        noCss: 'no-css',
        ordering: '--ordering=%val%',
        padding: '--padding=%val%',
        png8: '--png8',
        project: '--project',
        pseudoClassSeparator: '--pseudo-class-separator=%val%',
        quiet: '--quiet',
        recursive: '--recursive',
        ratios: '--ratios=%val%',
        retina: '--retina',
        source: '--source=%val%',
        output: '--output=%val%',
        scss: '--scss',
        scssTemplate: '--scss-template=%val%',
        separator: '--separator=%val%',
        spriteNamespace: '--sprite-namespace=%val%',
        url: '--url=%val%',
        watch: '--watch'
    };
    var DEFAULT_OPTIONS = {
        algorithm: null,//square|vertical|hortizontal|diagonal|vertical-right|horizontal-bottom
        crop: false,
        caat: false,
        cachebuster: false,
        cachebusterFilename: null,
        cachebusterFilenameOnlySprites: false,
        cocos2d: false,
        css: null,
        img: null,
        cssTemplate: null,
        force: false,
        followLinks: false,
        html: false,
        json: false,
        jsonFormat: null,
        less: false,
        lessTemplate: null,
        margin: null,
        namespace: null,
        noImg: false,
        noCss: false,
        ordering: null,
        padding: null,
        png8: false,
        project: false,
        pseudoClassSeparator: null,
        quiet: false,
        recursive: false,
        ratios: null,
        retina: false,
        source: null,
        output: null,
        scss: false,
        scssTemplate: null,
        separator: null,
        spriteNamespace: null,
        url: null,
        watch: false
    };
    var exec = require('child_process').exec;
    var done = this.async;

    grunt.registerMultiTask('spglue', 'Sprite generator with Glue & Grunt', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options(DEFAULT_OPTIONS);
        var done = this.async;
        var count = 0;
        this.files.forEach(function (f) {
            // filepathのマッピング
            var src = f.src.filter(function(filepath) {
                if (!grunt.file.isDir(filepath)) {
                    grunt.log.warn('Not directory: ' + filepath.src);
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                return filepath
            }).join('');

            // コマンドの生成
            var command = ['glue'];
            command.push(src);
            command.push(f.dest);
            if (options.cmd) {
                //cmdオプションがある場合はそのまま流し込み
                command.push(options.cmd);
            } else {
                //プロパティ見てオプションコマンドの追加
                for (var key in options) {
                    var v = parseOption(key,options[key]);
                    if (v) {
                        command.push(v);
                    }
                }
            }

            grunt.log.writeln('Execute: ' + command.join(' '));
            //コマンド実行
            exec(command.join(' '), function (err, stdout, stderr) {
                ++count;
                var result = true;
                if (err) {
                    result = err;
                } else if (stderr) {
                    result = false;
                }
                if (count === this.files.length) {
                    done(result);
                    return result;
                }
            });
        });

        function parseOption(key,value) {
            var val = COMMANDS[key];
            if (!val) {
                grunt.log.warn('Not found command ' + key + '(' + value + ')');
                return;
            }
            if (!value || value === false) {
                return;
            }
            return val.replace('%val%',value);
        }
    });
};
