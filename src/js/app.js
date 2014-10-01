'use strict';

/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
    skynetRest = require('./skynetRest.js'),
    octobluTitle = 'Octoblu',
    meshbluTitle = 'Meshblu',
    conn;

function createMain(body){
    return new UI.Card({
        title: octobluTitle,
        icon: 'images/menu_icon.png',
        body: body
    });
}

function showCard(title, msg) {
    var card = new UI.Card();
    card.title(title);
    card.body(msg);
    card.show();

    return card;
}

var main = createMain('Connecting to ' + meshbluTitle + '...'),
    card,
    connected = false;

main.show();

var buttonPosition = 0;

var buttons = [
    {
        flowId : '1',
        flowName : 'Bacon',
        triggerName : 'Sweet',
        triggerId : '1'
    }
];

function getDefaultFlowCard(){
    card = showCard('Trigger Flows', 'Press up and down arrows to navigate between triggers');
}

function updateDefaultFlowCard(){
    card.title('Trigger Flows');
    card.body('Press up and down arrows to navigate between triggers');
}

function showTrigger(trigger){
    if(trigger){
        card.title(trigger.flowName);
        card.body('Trigger ' + trigger.triggerName);
    }else{
        updateDefaultFlowCard();
    }
}

function showFlows(){
    getDefaultFlowCard();

    card.on('click', 'up', function(){
        showTrigger(buttons[++buttonPosition]);
    });

    card.on('click', 'down', function(){
        showTrigger(buttons[--buttonPosition]);
    });
}

function onConnect(data){
    if(connected){
        return;
    }
    console.log('Creds: ', JSON.stringify(data));
    connected = true;

    main.body('Press select to change group.');
    // Connected
    main.on('click', 'select', function () {
      showFlows();
    });

}


conn = skynetRest.connect(onConnect);

