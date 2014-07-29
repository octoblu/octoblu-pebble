/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
    skynet = require('./skynet.js'),
    title = 'Octoblu';

var main = new UI.Card({
    title: title,
    icon: 'images/menu_icon.png',
    body: 'Connecting to Meshblu...'
});

main.show();

skynet.status(function (data) {
    main.subtitle('Skynet: ' + data.skynet);
});

function showCard(title, msg){
    var card = new UI.Card();
    card.title(title);
    card.body(msg);
    card.show();
};

skynet.connect(function (data) {

    var msg = 'Connected to Skynet';
    main.body(msg);

    main.on('click', 'select', function (e) {
        console.log('Clicked Select');
        showCard('Skynet UUID', data.uuid);
    });

});

