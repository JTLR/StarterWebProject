module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: {
                    drop_console: true
                }
            },
            build: {
                src: 'pub/js/javascript.min.js',
                dest: 'pub/js/javascript.min.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['pub/js/plugins/jquery-1.9.1.min.js', 'pub/js/plugins/jquery.easydropdown.min.js', 'pub/js/javascript.js'],
                dest: 'pub/js/javascript.min.js'
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: 'code/sass',
                    cssDir: 'pub/css',
                    environment: 'development'
                }
            },
            prod: {
                options: {
                    sassDir: 'code/sass',
                    cssDir: 'pub/css',
                    environment: 'production'
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
                    cwd: 'pub/images/',       
                    src: ['*.{png,jpg,gif}'],
                    dest: 'pub/images/optimised/'
                }]
            }
        },
        watch: {
            dev: {
                files: ['pub/js/plugins/*.js', 'pub/js/javascript.js',  '**/*.scss', 'pub/images/*.{png,jpg,gif}'],
                tasks: ['concat', 'uglify', 'compass:dev', 'imagemin']
            },
            prod: {
                files: ['pub/js/plugins/*.js', 'pub/js/javascript.js',  '**/*.scss', 'pub/images/*.{png,jpg,gif}'],
                tasks: ['concat', 'uglify', 'compass:prod', 'imagemin']
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
                src: ['pub/js/javascript.js']
            }
        },
        csslint: {
            options: {
                ids: false
            },
            files: {
                src: ['pub/css/stylesheet.css']
            }
        },
        browserstack: {
            dev: {
                credentials: {
                    username: 'drew@emosaic.co.uk',
                    password: '1nfiniteBrowserStack'
                }
            },
            start: {
                url: 'http://www.gsmtravel.joseph.dev.mosaic-digital.com/home/index.html',
                browsers: [{
                    os: 'win',
                    browser: 'ie',
                    version: '8.0'
                }]
            }
        },
        browserstack_list: {
            dev: {
                username: 'drew@emosaic.co.uk',
                password: '1nfiniteBrowserStack'
            }
        },
        clean : {
            src : [
                "**/example-*.{js,css,php,tpl,twig}",
                "**/demo-*.{js,css,php,tpl,twig}"
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
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserstack');

    // Defined tasks
    grunt.registerTask('produce', ['concat', 'uglify', 'compass:prod', 'imagemin', 'clean']);
    grunt.registerTask('validate', ['jshint', 'csslint']);
    grunt.registerTask('browsertest', ['browserstack']);

};