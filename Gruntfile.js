module.exports = (grunt) => {
  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ['assets/css']
        },
        files: {
          '*.css': '*.less'
        }
      },
      production: {
        options: {
          paths: ['assets/css']
        },
        files: {
          '*.css': '*.less'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '<%= less.files %>'],
      tasks: ['jshint', 'less']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'less']);
  grunt.registerTask('heroku:production', 'jshint less');
};