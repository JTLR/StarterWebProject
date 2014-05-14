module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            build: {
                src: 'javascript/javascript.js',
                dest: 'javascript/javascript.min.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: 'javascript/*.js',
                dest: 'javascript/javascript.min.js'
            }
        },
        sass: {
            dev: {
                files: {
                    'css/stylesheet.css': 'sass/stylesheet.scss'
                },
                options: {
                    sourceComments: 'map'
                }
            },
            prod: {
                files: {
                    'css/stylesheet.css': 'sass/stylesheet.scss'
                },
                options: {
                    outputStyle: 'compressed'
                }
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'images/',       
                    src: ['*.{png,jpg,gif}'],
                    dest: 'images/optimised/'
                }]
            }
        },
        watch: {
            images: {
                files: ['images/*.{png,jpg,gif}'],
                tasks: ['imagemin:dynamic']
            },
            javascript: {
                files: ['javascript/plugins/*.js', 'javascript/javascript.js'],
                tasks: ['uglify:build']
            },
            sass: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:dev']
            }
        },
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
                src: ['javascript/javascript.js']
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
        browserstack: {
            dev: {
                credentials: {
                    username: '',
                    password: ''
                }
            },
            start: {
                url: '',
                browsers: [{
                    os: 'win',
                    browser: 'ie',
                    version: '8.0'
                }]
            }
        },
        browserstack_list: {
            dev: {
                username: '',
                password: ''
            }
        },
        clean : {
            src : [
                "**/example-*.{js,css,php,tpl,twig}",
                "**/demo-*.{js,css,php,tpl,twig}",
                "**/*.map"
            ]
        }
    });

    // Load npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserstack');

    // Defined tasks
    grunt.registerTask('validate', ['jshint', 'csslint']);
    grunt.registerTask('browsertest', ['browserstack']);
    grunt.registerTask('produce', ['uglify', 'sass:prod', 'imagemin', 'clean']);
};