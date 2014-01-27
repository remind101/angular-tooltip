'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: require('./bower.json'),
    release: {
      options: {
        npm: false,
        file: 'bower.json'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: process.env.CI
      }
    },
    ngmin: {
      dist: {
        src: ['src/angular-modal.js'],
        dest: '.tmp/angular-modal.js'
      }
    },
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        src: ['.tmp/angular-modal.js'],
        dest: 'dist/angular-modal.js'
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      dist: {
        files: {
          'dist/angular-modal.min.js': 'dist/angular-modal.js'
        }
      }
    }
  });

  grunt.registerTask('test', [
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'ngmin',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'test'
  ]);
};
