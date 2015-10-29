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
    exports.passedAllChecks = true;

    // Local array for keeping results of target checks.
    var passed = [];

    // Reset the result, so that it doesn't get passed into a different sub-test.
    var resetResult = function() {
        exports.passedAllChecks = true;
        passed.length = 0;
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
        var matched = false;

        files = getFiles(files).forEach(function(file) {

            // Read the file contents.
            var content = grunt.file.read(file);

            // Run pattern match
            matches = content.match(pattern);

            if(matches) {
                var instances = (matches.length > 1) ? "instances" : "instance";
                grunt.log.error("Check failed, on " + matches.length + " " + instances + ", for '" + human + "', in file '" + file + "'.");
                matched = true;
            }

        });

        // Return whether the check passed or failed.
        return !matched;
    };

    exports.hyperlinks = function(data, files) {
        resetResult();

        var pattern;

        if(data.hashed) {
            pattern = /href="#"/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Hashed hyperlinks'));
        }

        if(data.broken) {}

        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    };

    exports.colour = function(data) {
        resetResult();
    };

    exports.images = function(data, files) {
        resetResult();

        var pattern;

        if(data.alt.missing) {
            pattern = /<img(?![^>]*\balt=)[^>]*?>/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Missing image alt attributes'));
        }

        if(data.alt.empty) {
            pattern = /<img(.*)\balt=""(.*)>/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Empty image alt attributes'));
        }

        if(data.source.missing) {
            pattern = /<img(?![^>]*\bsrc=)[^>]*?>/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Missing image src attributes'));
        }

        if(data.source.empty) {
            pattern = /<img(.*)\bsrc=""(.*)>/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Empty image src attributes'));
        }

        if(data.source.hashed) {
            pattern = /<img(.*)\bsrc="#"(.*)>/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Hashed image src attributes'));
        }

        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    };

    exports.styles = function(data, files) {
        resetResult();

        var pattern;

        if(data.inline) {
            pattern = /style=/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Inline style attributes'));

            pattern = /<style>/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Inline style elements'));
        }

        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    };

    exports.pagespeed = function(data) {
        resetResult();
    };

    return exports;
};
