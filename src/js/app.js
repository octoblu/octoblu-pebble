'use strict';

/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
    skynet = require('./skynet.js'),
    octobluTitle = 'Octoblu',
    meshbluTitle = 'Meshblu';

var main = new UI.Card({
    title: octobluTitle,
    icon: 'images/menu_icon.png',
    body: 'Connecting to ' + meshbluTitle + '...'
});

main.show();

//skynet.createConnection({});

function showCard(title, msg) {
    var card = new UI.Card();
    card.title(title);
    card.body(msg);
    card.show();
}

skynet.connect(function (data) {

    var msg = 'Connected to ' + meshbluTitle;

    main.body(msg);

    main.on('click', 'select', function () {
        showCard(meshbluTitle + ' UUID', data.uuid);
    });

});

