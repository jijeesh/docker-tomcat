module.exports = function(grunt) {
 // Project configuration.
 grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
webshot: {
homepage: {
options: {
siteType: 'url',
  site: 'http://202.83.47.116:61102/screenshot_page.jsp?mode=preview&id=59&archive=12&version=&0.4039899841028801&contentedit=%3CSPAN+TITLE%3D%22i%3D0%22%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3C%2Fh2%3E%0D%0A%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3FHELLO%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3C%2Fh2%3E%40%40%40Title%40%40%40+%40%40%40First+Names%40%40%40+%40%40%40Surname%40%40%40%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3F%3F%3F%3F%3F%3Cbr%3E%3C%2Fh2%3E%40%40%40Address%40%40%40%3Ch2+class%3D%22jobdirectory%22%3E%3F%3C%2Fh2%3E%3Cp%3E%40%40%40City%40%40%40%3Cbr%3E%3C%2Fp%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3C%2Fh2%3E%40%40%40State%40%40%40%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3F%3F%3C%2Fh2%3E%40%40%40Postal+Code%40%40%40%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3C%2Fh2%3E%40%40%40Country%40%40%40%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3EE%3F%3F%3F%3C%2Fh2%3E%40%40%40Email%40%40%40%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3C%2Fh2%3E%40%40%40Phone%40%40%40%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3F%3F%3C%2Fh2%3E%40%40%40Birthdate%40%40%40%3Cbr%3E%3Ch2+class%3D%22jobdirectory%22%3E%3F%3F%3C%2Fh2%3E%40%40%40Nationality%40%40%40%3Cbr%3E%3Ch2%3E%3F%3F%3F%3C%2Fh2%3E%40%40%40CV%40%40%40%3Cbr%3E%3C%2FSPAN%3E&titleedit=%3CSPAN+TITLE%3D%5C%22i%3D0%5C%22%3E%40%40%40Surname%40%40%40%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3F%3C%2FSPAN%3E',
savePath: './tmp/590.7308179255386794.png',
windowSize: {
 width: 1024,
 height: 768
}, shotSize: {
width: 1024,
height: 'all'
 },
//	 phantomPath: '/home/kishore/phantomjs-2.0.0/bin/phantomjs'
 }
}
 }
 });
 // Load the plugin that provides the "uglify" task.
 grunt.loadNpmTasks('grunt-webshot');
// Default task(s).
grunt.registerTask('default', ['webshot']);
};
