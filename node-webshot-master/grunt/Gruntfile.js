module.exports = function(grunt) {
 // Project configuration.
 grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
webshot: {
homepage: {
options: {
siteType: 'url',
  site: 'http://www.yahoo.co.jp',
savePath: './tmp/yahoo.co.jp.png',
windowSize: {
 width: 1366,
 height: 768
}, shotSize: {
width: 1366,
height: 'all'
 },
 }
}
 }
 });
 // Load the plugin that provides the "uglify" task.
 grunt.loadNpmTasks('grunt-webshot');
// Default task(s).
grunt.registerTask('default', ['webshot']);
};
