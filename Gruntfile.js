module.exports = function (grunt)
{
    'use strict';

    // Load Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Set up timestamp.
        opt : {
            timestamp: '<%= new Date().getTime() %>'
        },

        // Generate filename timestamps within template/mockup files.
        replace: {
            theme: {
                options: {
                    patterns: [{
                            match: 'timestamp',
                            replacement: '<%= opt.timestamp %>'
                    }]
                },
                files: [
                    {
                        expand: true,
                        cwd: 'templates/',
                        src: ['**'],
                        dest: 'public/templates/'
                    }
                ]
            }
        },

        // Sass configuration.
        sass: {
            options: {
                includePaths: ['bower_components/bootstrap/scss']
            },
            dist: {
                options: {
                    outputStyle: 'expanded', // outputStyle = expanded, nested, compact or compressed.
                    sourceMap: true
                },
                files: {
                    'public/assets/css/app.css': 'scss/app.scss'
                }
            }
        },

        // Run Textpattern setup script.
        shell: {
            setup: {
                command: [
                    'php setup/setup.php'
                ].join('&&'),
                options: {
                    stdout: true
                }
            }
        },

        // Uglify and copy JavaScript files from `bower_components` and `js` to `public/assets/js/`.
        uglify: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist/js',
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
                        // TODO: copy `bower_components` files.
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
    grunt.registerTask('build', ['sass', 'replace', 'uglify']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('setup', ['shell:setup']);
    grunt.registerTask('travis', ['sass']);
};
