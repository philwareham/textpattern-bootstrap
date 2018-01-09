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
                css: 'themes/bootstrap_framework/assets/css/',
                js: 'themes/bootstrap_framework/assets/js/',
                templates: 'themes/bootstrap_framework/'
            }
        },

        // Clean distribution and temporary directories to start afresh.
        clean: [
            'themes/'
        ],

        // Run some tasks in parallel to speed up the build process.
        concurrent: {
            dist: [
                'copy',
                'css',
                'jshint',
                'uglify'
            ]
        },

        copy: {
            // Copy JavaScript files from various sources.
            templates: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= paths.src.templates %>',
                        src: '**',
                        dest: '<%= paths.dest.templates %>'
                    }
                ]
            }
        },

        // Check code quality of Gruntfile.js and site-specific JavaScript using JSHint.
        jshint: {
            options: {
                bitwise: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                es3: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                noarg: true,
                noempty: true,
                nonew: true,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                browser: true,
                globals: {
                    jQuery: false,
                    $: false,
                    module: true,
                    require: true
                }
            },
            files: [
                'Gruntfile.js',
                '<%= paths.src.js %>**/*.js'
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
                src: ['*.css'],
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

        // Uglify and copy JavaScript files from `node_modules` plus `js/app.js` to `public/assets/js/`.
        uglify: {
            dist: {
                files: [
                    {
                        '<%= paths.dest.js %>app.min.js': [
                            // Option 1: All Bootstrap JavaScript.
                            'node_modules/bootstrap/dist/js/bootstrap.js',

                            // Option 2: Selective Bootstrap JavaScript.
                            //'node_modules/bootstrap/js/dist/*.js',
                            // Ignore JavaScript plugins that you do not require in your project, for example:
                            //'!alert.js',
                            //'!button.js',
                            //'!carousel.js',
                            //'!collapse.js',
                            //'!dropdown.js',
                            //'!modal.js',
                            //'!popover.js',
                            //'!scrollspy.js',
                            //'!tab.js',
                            //'!tooltip.js',
                            //'!util.js',

                            // Then add site-specific JavaScript at the end of file.
                            '<%= paths.src.js %>app.js'
                        ],
                        // Site-specific vendor JavaScript libraries.
                        '<%= paths.dest.js %>vendor/popper.min.js': ['node_modules/popper.js/dist/umd/popper.js']
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
            },
            templates: {
                files: '<%= paths.src.templates %>**',
                tasks: 'copy'
            }
        }

    });

    // Register tasks.
    grunt.registerTask('build', ['clean', 'concurrent']);
    grunt.registerTask('css', ['sasslint', 'sass', 'postcss']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('travis', ['jshint', 'build']);
};
