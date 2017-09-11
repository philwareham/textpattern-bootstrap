module.exports = function (grunt)
{
    'use strict';

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean distribution directory to start afresh.
        clean: ['<%= paths.dest.dist %>'],

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'css',
                'copy'
            ]
        },

        // Add vendor prefixed styles and other post-processing transformations.
        postcss: {
            options: {
                processors: [
                    require('autoprefixer'),
                    require('cssnano')
                ]
            },
            files: {
                expand: true,
                cwd: '<%= paths.dest.css %>',
                src: ['*.css', '!*.min.css'],
                dest: '<%= paths.dest.css %>'
            }
        },

        // Sass configuration.
        sass: {
            options: {
                includePaths: ['node_modules/bootstrap/scss'],
                outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                sourceMap: false
            },
            dist: {
                files: {
                    'public/assets/css/app.css': 'scss/app.scss'
                }
            }
        },

        // Uglify and copy JavaScript files from `node_modules` and `js` to `public/assets/js/`.
        uglify: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/bootstrap/dist/js',
                        src: [
                            '**/*.js',
                            // Ignore the duplicate minified file.
                            '!bootstrap.min.js',
                        ],
                        dest: 'public/assets/js/'
                    },
                    {
                        expand: true,
                        cwd: 'js/',
                        src: ['**/*.js'],
                        dest: 'public/assets/js/'
                    }
                ]
            }
        },

        // Directories watched and tasks performed by invoking `grunt watch`.
        watch: {
            sass: {
                files: 'scss/**',
                tasks: ['sass']
            },
            js: {
                files: 'js/**',
                tasks: ['uglify']
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'build']);
};
