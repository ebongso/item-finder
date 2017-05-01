module.exports = (grunt) => {
  grunt.initConfig({
    jshint: {
      development: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
          globals: {
            jQuery: true
          }
        }
      },
      production: {
        files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
        options: {
          globals: {
            jQuery: true
          }
        }
      }
    },
    sass: {
      development: {
        options: {
          paths: ['assets/css']
        },
        files: {
          '*.css': '*.scss'
        }
      },
      production: {
        options: {
          paths: ['assets/css']
        },
        files: {
          '*.css': '*.scss'
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>', '<%= sass.files %>'],
      tasks: ['jshint', 'sass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'sass']);
  grunt.registerTask('heroku:production', 'jshint sass');
};