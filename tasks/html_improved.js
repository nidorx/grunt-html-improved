/*
 * grunt-html-improved
 * https://github.com/gruntjs/grunt-contrib-less
 *
 * Copyright (c) 2015 Alex Rodin, contributors
 * Licensed under the GPL2 license.
 */

/* global module, process */

'use strict';


module.exports = function (grunt) {
    var chalk = require('chalk');
    var htmlImproved = require('html-improved');

    var sampleCOnfig = {
        development: {
            options: {
                // permite definir as variáveis padrão
                defaultVars: {}
            },
            files: {
                '<%= yeoman.app %>/styles/main.css': '<%= yeoman.app %>/less/main.less'
            }
        }
    };

    grunt.registerMultiTask('htmlImproved', 'Compile HTML improvements', function () {
        var options = this.options({});



        if (this.files.length < 1) {
            grunt.verbose.warn('Destination not written because no source files were provided.');
        }

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

            files.forEach(function (filepath) {
                var compiled;
                try {
                    compiled = htmlImproved(filepath, grunt.file.read);
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
