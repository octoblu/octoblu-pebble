/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
    connect = require('./connect.js'),
    title = 'Octoblu';

var main = new UI.Card({
  title: title,
  icon: 'images/menu_icon.png',
  subtitle: 'Hack the Planet!',
  body: 'Connecting to Meshblu...'
});

main.show();

var conn = connect(function(err, data){
    if(err){
        main.body(err);
    }else{
        main.body('Connected Meshblu');
    }
});