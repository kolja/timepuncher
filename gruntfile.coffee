module.exports = (grunt) ->
    grunt.initConfig
        nodemon:
            dev:
                options:
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    ignoredFiles: ['public/**','assets/**'],
                    env:
                        PORT: '3000'

        browserify:
            vendor:
                src: [],
                dest: 'public/js/vendor.js',
                options:
                    shim:
                        jquery:
                            path: 'bower_components/jquery/jquery.js',
                            exports: '$'
                        underscore:
                            path: 'bower_components/lodash/dist/lodash.js',
                            exports: '_'
                        backbone:
                            path: 'bower_components/backbone/backbone.js',
                            exports: 'Backbone',
                            depends:
                                underscore: 'underscore'
                        'backbone.babysitter':
                            path: 'bower_components/backbone.babysitter/lib/backbone.babysitter.js',
                            exports: 'Backbone.Babysitter',
                            depends:
                                backbone: 'Backbone'
                        'backbone.wreqr':
                            path: 'bower_components/backbone.wreqr/lib/backbone.wreqr.js',
                            exports: 'Backbone.Wreqr',
                            depends:
                                backbone: 'Backbone'
                        'backbone.marionette':
                            path: 'bower_components/backbone.marionette/lib/backbone.marionette.js',
                            exports: 'Marionette',
                            depends:
                                jquery: '$',
                                backbone: 'Backbone',
                                underscore: '_'
            app:
                src: ['assets/js/app.coffee'],
                dest: 'public/js/app.js',
                options:
                    external: ['jquery','underscore','backbone','backbone.babysitter','backbone.wreqr','backbone.marionette'],
                    transform: ['coffeeify']
        concat:
            options:
                separator: ';'
            'public/js/site.js': ['public/js/vendor.js','public/js/app.js']

        watch:
            scripts:
                files: ['assets/js/*.coffee'],
                tasks: ['browserify:app','concat'],
                options:
                    livereload: true

        concurrent:
            target:
                tasks: ['nodemon', 'watch'],
                options:
                    logConcurrentOutput: true

    tasks = ['grunt-browserify',
            'grunt-contrib-concat',
            'grunt-nodemon',
            'grunt-contrib-watch',
            'grunt-concurrent']

    grunt.loadNpmTasks task for task in tasks

    grunt.task.registerTask 'default', ['browserify','concat']
    grunt.task.registerTask 'start', ['concurrent:target']
