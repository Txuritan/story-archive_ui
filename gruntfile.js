// https://story-archive-ui-txuritan.c9users.io/
module.exports = function(grunt) {

    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        connect: {
            development: {
                options: {
                    port: 8080,
                    base: 'devel',
                    livereload: true
                }
            }
        },
        cssmin: {
            production: {
                files: {
                    'distr/css/star.min.css': ['distr/css/star.css']
                }
            }
        },
        less: {
            development: {
                files: {
                    'devel/css/star.css': 'src/less/star.less'
                }
            },
            production: {
                options: {
                    plugins: [
                        new(require('less-plugin-autoprefix'))({
                            browsers: ["last 5 versions"]
                        })
                    ]
                },
                files: {
                    'distr/css/star.css': 'src/less/star.less'
                }
            }
        },
        pug: {
            development: {
                options: {
                    pretty: true,
                    data: {
                        debug: true
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'src/pug/',
                    ext: '.html',
                    src: '**/*.pug',
                    dest: 'devel'
                }]
            }
        },
        watch: {
            development: {
                options: {
                    livereload: {
                        host: 'localhost',
                        port: 8081
                    }
                },
                files: ['src/**/*'],
                tasks: ['less:development', 'pug:development']
            }
        }
    });

    grunt.registerTask('development', ['less:development', 'pug:development', 'connect:development', 'watch:development']);

    grunt.registerTask('production', ['less:production', 'cssmin:production']);

};
