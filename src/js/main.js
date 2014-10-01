/*
 * This is the main PebbleJS file. You do not need to modify this file unless
 * you want to change the way PebbleJS starts, the script it runs or the libraries
 * it loads.
 *
 * By default, this will run app.js
 */

require('safe');

Pebble.addEventListener('ready', function(e) {
  // Initialize the Pebble protocol
  require('ui/simply-pebble.js').init();
  // Load local file
  require('app.js').init();
});

Pebble.addEventListener("webviewclosed",
  function(e) {
    var configuration = JSON.parse(decodeURIComponent(e.response));
    console.log("Configuration window returned: ", JSON.stringify(configuration));

    require('./octobluApi.js').setData(configuration);

    require('app.js').init();
  }
);

Pebble.addEventListener('showConfiguration', function(){
  Pebble.openUrl('https://app.octoblu.com/static/pebble-login.html');
});