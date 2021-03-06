/*
* grunt-checks
* https://github.com/edwardcasbon/grunt.checks
*
* Copyright (c) 2015 Edward Casbon
* Licensed under the MIT license.
*/

'use strict';

module.exports = function(grunt) {

    var checks = require('./lib/checks').init(grunt);

    grunt.registerMultiTask('checks', 'Description goes here.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({});

        // Switch statement for this.target, to call corresponding function in library.
        switch(this.target) {
            case 'hyperlinks':
                checks.hyperlinks(this.data, this.files);
                break;

            case 'images':
                checks.images(this.data, this.files);
                break;

            case 'styles':
                checks.styles(this.data, this.files);
                break;

            case 'meta':
                checks.meta(this.data, this.files);
                break;

            case 'gaTracking':
                checks.gaTracking(this.data, this.files);
                break;

            case 'colour':
                checks.colour(this.data);
                break;

            case 'pagespeed':
                checks.pagespeed(this.data);
                break;
        }

        if(checks.passedAllChecks) {
            grunt.log.writeln("Checks passed");
        } else {
            grunt.warn("Checks failed");
        }
    });

    // Register the default task.
    grunt.registerTask('default', 'checks');

};
