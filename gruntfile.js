module.exports = function (grunt) {

  // 1. Configure tasks
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'dist/script.min.js': ['src/index.js']
        }
      }
    }
  });

  // 2. Load plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 3. Register default task
  grunt.registerTask('default', ['uglify']);

};