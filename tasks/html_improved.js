/*
 * grunt-html-improved
 * https://github.com/gruntjs/grunt-contrib-less
 *
 * Copyright (c) 2015 Alex Rodin, contributors
 * Licensed under the GPL2 license.
 */

/* global module, process */

'use strict';

var path = require('path');

module.exports = function (grunt) {
    var chalk = require('chalk');
    var htmlImproved = require('html-improved');

    grunt.registerMultiTask('htmlImproved', 'Compile HTML improvements', function () {
        var options = this.options({});

        var defaultVars = options.defaultVars;
        if (typeof defaultVars === 'function') {
            defaultVars = defaultVars();
        }


        if (this.files.length < 1) {
            grunt.verbose.warn('Destination not written because no source files were provided.');
        }

        var cwd = process.cwd();

        this.files.forEach(function (f) {
            var files = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            if (files.length === 0) {
                if (f.src.length < 1) {
                    grunt.log.warn('Destination not written because no source files were found.');
                }
                return;
            }

            files.map(function (filePath) {
                return path.join(cwd, filePath);
            }).forEach(function (filepath) {
                var compiled;
                try {
                    compiled = htmlImproved(filepath, grunt.file.read, defaultVars);
                    grunt.file.write(f.dest, compiled);
                    grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created.');
                } catch (e) {
                    grunt.log.error(e);
                    grunt.fail.warn('htmlImproved failed to compile "' + filepath + '".');
                    return false;
                }
            });
        });

        grunt.log.ok(this.files.length + ' ' + grunt.util.pluralize(this.files.length, 'file/files') + ' created.');
    });
};
