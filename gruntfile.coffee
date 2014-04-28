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
                src: ['bower_components/jquery/jquery.js',
                      'bower_components/lodash/dist/lodash.js',
                      'bower_components/angular/angular.js',
                      'bower_components/angular-route/angular-route.js'
                      'bower_components/angular-resource/angular-resource.js'
                ],
                dest: 'public/js/vendor.js'
            app:
                src: ['assets/js/*'],
                dest: 'public/js/app.js',
                options:
                    external: ['jquery','lodash','angular']
                    transform: ['coffeeify']
        concat:
            options:
                separator: ';'
            'public/js/site.js': ['public/js/vendor.js','public/js/app.js']

        watch:
            scripts:
                files: ['assets/js/*.js'],
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
