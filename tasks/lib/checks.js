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
    exports.passedAllChecks = false;

    // Local array for keeping results of target checks.
    var passed = [];

    // Reset the result, so that it doesn't get passed into a different sub-test.
    var resetResult = function() {
        exports.passedAllChecks = false;
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

    var logFailedTest = function(numInstances, humanReadableMessage, file) {
        var instances = (numInstances > 1) ? "instances" : "instance";
        grunt.log.error("Check failed, on " + numInstances + " " + instances + ", for '" + humanReadableMessage + "', in file '" + file + "'.");
    }

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
                logFailedTest(matches.length, human, file);
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

    exports.meta = function(data, files) {
        resetResult();
        var count = 0;
        var pattern;
        var match;

        var files = getFiles(files).forEach(function(file) {
            var content = grunt.file.read(file);

            // Title length.
            if(data.maxTitleLength) {
                pattern = /<title[^>]*>([^<]+)<\/title>/gi;
                count = 0;
                while((match = pattern.exec(content)) !== null) {
                    if(match[1].length > data.maxTitleLength) {
                        passed.push(false);
                        count++;
                    } else {
                        passed.push(true);
                    }
                }

                if(count > 0) {
                    logFailedTest(count, 'Meta title exceeds max title length', file);
                }
            }

            // Description length.
            if(data.maxDescriptionLength) {
                pattern = /<meta.*?name="description".*?content="(.*?)".*?>|<meta.*?content="(.*?)".*?name="description".*?>/gi;
                count = 0;
                while((match = pattern.exec(content)) !== null) {
                    if(match[1].length > data.maxDescriptionLength) {
                        passed.push(false);
                        count++;
                    } else {
                        passed.push(true);
                    }
                }

                if(count > 0) {
                    logFailedTest(count, 'Meta description exceeds max description length', file);
                }
            }
        });

        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    };

    exports.gaTracking = function(data, files) {
        resetResult();
        var pattern;

        if(data.enabled === false) {
            grunt.log.writeln("Skipping, as disabled in configuration");
            exports.passedAllChecks = true;
            return false;
        }

        if(data.category.missing) {}

        if(data.category.empty) {
            pattern = /data-ga-track-category=""/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Empty GA tracking category attributes'));
        }

        if(data.action.missing) {}

        if(data.action.empty) {
            pattern = /data-ga-track-action=""/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Empty GA tracking action attributes'));
        }

        if(data.label.missing) {}

        if(data.label.empty) {
            pattern = /data-ga-track-label=""/gi;
            passed.push(checkFilesForPattern(files, pattern, 'Empty GA tracking label attributes'));
        }

        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    }

    exports.colour = function(data) {
        grunt.log.writeln("@TODO - Finish test");

        resetResult();
        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    };

    exports.pagespeed = function(data) {
        grunt.log.writeln("@TODO - Finish test");

        resetResult();
        exports.passedAllChecks = (passed.indexOf(false) === -1) ? true : false;
    };

    return exports;
};
