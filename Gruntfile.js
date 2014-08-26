module.exports = function(grunt) {
    var projectHomePage = '',
        projectURL = '';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Build tools
        uglify: {
            libs: {
                src: ['javascript/libs/*.js', '!javascript/libs/*.min.js'],
                dest: 'javascript/libs',
                expand: true,
                flatten: true,
                drop_console: true,
                ext: '.min.js',
                extDot: 'last'
            }
        },
        sass: {
            dev: {
                files: {
                    'css/stylesheet.css': 'sass/stylesheet.scss',
                },
                options : {
                    sourceComments: 'normal'
                }
            }
        },
        uncss: {
            dist: {
                options: {
                    stylesheets: ['css/stylesheet.css']
                },
                files: {
                    'css/stylesheet.css': ['*.html', 'html/**/*.html']
                }
            }
        },
        cmq: {
            stylesheet: {
                files: {
                    'css/stylesheet.css': ['css/stylesheet.css']
                }
            }

        },
        cssmin: {
            stylesheet: {
                files: {
                    'css/stylesheet.min.css': ['css/stylesheet.css']
                }
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'images/',       
                    src: 'images/*.{png,jpg,gif}',
                    dest: 'images/optimised/'
                }]
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'javascript/',
                    mainConfigFile: 'javascript/main.js',
                    name: 'main',
                    out: 'javascript/main.min.js',
                    preserveLicenseComments: false,
                    uglify: {
                        expand: true,
                        flatten: true,
                        drop_console: true
                    }
                }
            }
        },
        // Testing
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            files: {
                src: ['javascript/main.js']
            }
        },
        csslint: {
            options: {
                ids: false
            },
            files: {
                src: ['css/stylesheet.css']
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                url: projectURL
            },
            desktop: {
                options: {
                    url: projectHomePage,
                    locale: 'en_GB',
                    strategy: 'desktop',
                    threshold: 40
                }
            },
            mobile: {
                options: {
                    url: projectHomePage,
                    locale: 'en_GB',
                    strategy: 'mobile',
                    threshold: 40
                }
            }
        },
        // Production/clean up tools
        clean : {
            src : [
                '**/example-*.{js,css,php,tpl,twig}',
                '**/demo-*.{js,css,php,tpl,twig}'
            ]
        },
        // Tasks
        watch: {
            images: {
                files: ['images/*.{png,jpg,gif}'],
                tasks: ['imagemin:dynamic']
            },
            javascriptMain: {
                files: ['javascript/**/*.js', '!javascript/**/*.min.js'],
                tasks: ['requirejs']
            },
            javascriptPlugins: {
                files: ['javascript/*/*.js', '!javascript/*/*.min.js'],
                tasks: ['uglify:plugins']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass', 'cmq', 'cssmin']
            }
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-combine-media-queries');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-uncss');

    // Defined tasks
    grunt.registerTask('validate', ['jshint', 'csslint']);
    grunt.registerTask('prod', ['requirejs', 'uglify:plugins', 'sass', 'cmq', 'uncss', 'cssmin', 'imagemin', 'clean']);
    grunt.registerTask('un-css', ['uncss', 'cssmin']);
};