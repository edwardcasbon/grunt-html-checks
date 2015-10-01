/*
* grunt-checks
* https://github.com/edwardcasbon/grunt.checks
*
* Copyright (c) 2015 Edward Casbon
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        // Configuration.
        checks: {
            options: {
            },

            // Check hyperlinks.
            hyperlinks: {
                hashed: true,   // Check for hashed hyperlinks.
                broken: true,    // Check for broken hyperlinks.
                src: ['**/*.htm', '**/*.html', '!node_modules/**/*']  // Source files to check against.
            },

            // Check colour references.
            colour: {
                honeycomb: true, // Check colour references match Honeycomb palette.
                src: ['**/*.htm', '**/*.html', '!node_modules/**/*']  // Source files to check against.
            },

            // Check image elements.
            images: {
                alt: {
                    missing: true,  // Check for missing alt tags.
                    empty: true     // Check for empty alt tags.
                },
                source: {
                    missing: true,  // Check for missing image src tags.
                    empty: true,    // Check for empty image src tags.
                    hashed: true    // Check for hashed image src tags.
                },
                src: ['**/*.htm', '**/*.html', '!node_modules/**/*']  // Source files to check against.
            },

            styles: {
                inline: true,   // Check for inline style tags.
                src: ['**/*.htm', '**/*.html', '!node_modules/**/*']  // Source files to check against.
            },

            // Check against Google pagespeed insights.
            pagespeed: {
                threshold: 70
            }
        }

    });

    grunt.loadTasks('tasks');
};
