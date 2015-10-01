/*
* grunt-checks
* https://github.com/edwardcasbon/grunt.checks
*
* Copyright (c) 2015 Edward Casbon
* Licensed under the MIT license.
*/

'use strict';

exports.init = function(grunt) {

    // Whether the checks passed or failed. (true for passed)
    exports.passed = true;

    // Reset the result, so that it doesn't get passed into a different sub-test.
    var resetResult = function() {
        exports.passed = true;
    };

    // Get the files to check on.
    var getFiles = function(src) {
        var files;
        src.forEach(function(f){
            files = f.src.filter(function(filepath){
                return (grunt.file.exists(filepath)) ? true : false;
            });
        });
        return files;
    };

    // Check files for a pattern, and return whether the file passed.
    var checkFilesForPattern = function(files, pattern, human) {
        var matches = null;

        files = getFiles(files).forEach(function(file) {

            // Read the file contents.
            var content = grunt.file.read(file);

            // Run pattern match
            matches = content.match(pattern);

            if(matches) {
                var instances = (matches > 1) ? "instances" : "instance";
                grunt.log.error("Check failed, on " + matches.length + " " + instances + ", for '" + human + "', in file '" + file + "'.");
            }

        });

        // Return whether the check passed or failed.
        return (matches === null) ? true : false;
    };

    exports.hyperlinks = function(data, files) {
        resetResult();

        if(data.hashed) {
            var pattern = /href="#"/gi;
            exports.passed = checkFilesForPattern(files, pattern, 'Hashed hyperlinks');
        }

        if(data.broken) {
            grunt.log.writeln("@todo - Broken hyperlinks");
        }
    };

    exports.colour = function(data) {
        resetResult();
    };

    exports.images = function(data) {
        resetResult();
    };

    exports.styles = function(data) {
        resetResult();
    };

    exports.pagespeed = function(data) {
        resetResult();
    };

    return exports;
};
