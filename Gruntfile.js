module.exports = function (grunt)
{
    'use strict';

    // Load all Grunt tasks.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up paths.
        paths: {
            src: {
                sass: 'scss/',
                js: 'js/',
                templates: 'templates/'
            },
            dest: {
                css: 'public/assets/css/',
                js: 'public/assets/js/',
                templates: 'public/templates/'
            }
        },

        // Clean distribution and temporary directories to start afresh.
        clean: [
            '<%= paths.dest.css %>',
            '<%= paths.dest.js %>'
        ],

        concat: {
            dist: {
                src: [
                    // Option 1: All Bootstrap JavaScript.
                    'node_modules/bootstrap/dist/js/bootstrap.js'

                    // Option 2: Selective Bootstrap JavaScript.
                    //'node_modules/bootstrap/js/dist/*.js'
                    // Ignore JavaScript plugins that you do not require in your project, for example:
                    //, '!alert.js'
                    //, '!button.js'
                    //, '!carousel.js'
                    //, '!collapse.js'
                    //, '!dropdown.js'
                    //, '!modal.js'
                    //, '!popover.js'
                    //, '!scrollspy.js'
                    //, '!tab.js'
                    //, '!tooltip.js'
                    //, '!util.js'
                ],
                dest: '<%= paths.dest.js %>bootstrap.min.js'
            }
        },

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'css',
                'concat'
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
                src: [
                    '*.css',
                    // Ignore any existing minified CSS files.
                    '!*.min.css'
                ],
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
                    '<%= paths.dest.css %>app.min.css': '<%= paths.src.sass %>app.scss'
                }
            }
        },

        // Validate Sass files via sass-lint.
        sasslint: {
            options: {
                configFile: '.sass-lint.yml'
            },
            target: [
                '<%= paths.src.sass %>**/*.scss',
                '!<%= paths.src.sass %>_custom.scss'
            ]
        },

        // Uglify and copy JavaScript files from `node_modules` and `js` to `public/assets/js/`.
        uglify: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.dest.js %>',
                        src: ['**/*.js'],
                        dest: 'public/assets/js/'
                    },
                    {
                        '<%= paths.dest.js %>app.min.js': ['<%= paths.src.js %>app.js']
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
    grunt.registerTask('build', ['clean', 'concurrent', 'uglify']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'build']);
};
