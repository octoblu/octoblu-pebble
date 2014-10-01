'use strict';

/**
 *  Welcome Octoblu Pebble App
 */

var UI = require('ui'),
  skynetRest = require('./skynetRest.js'),
  octobluApi = require('./octobluApi.js'),
  _ = require('./lodash'),
  octobluTitle = 'Octoblu',
  meshbluTitle = 'Meshblu',
  conn;

function createMain(body) {
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

var buttonPosition = -1,
  buttons = [];

function getDefaultFlowCard() {
  card = showCard('Trigger Flows', 'Press up and down arrows to navigate between triggers');
}

function updateDefaultFlowCard() {
  card.title('Trigger Flows');
  card.body('Press up and down arrows to navigate between triggers');
}

function showTrigger(trigger) {
  if (trigger) {
    card.title(trigger.flowName);
    card.body('Trigger ' + trigger.triggerName);
  } else {
    updateDefaultFlowCard();
  }
}

function getButton(direction) {
  var next;
  switch (direction) {
    case 'up':
      next = buttonPosition - 1;
      break;
    case 'down':
      next = buttonPosition + 1;
      break;
    case 'select':
      next = buttonPosition;
      break;
  }
  if (buttons[next]) {
    return buttons[next];
  }
  return null;
}

function showFlows() {
  getDefaultFlowCard();

  card.on('click', 'up', function() {
    showTrigger(getButton('up'));
  });

  card.on('click', 'down', function() {
    showTrigger(getButton('down'));
  });

  card.on('click', 'select', function() {
    octobluApi.triggerFlow(getButton('select'));
  });
}

function onConnect(data) {
  if (connected) {
    return;
  }
  console.log('Creds: ', JSON.stringify(data));
  connected = true;

  octobluApi.getFlows(function(flows) {
    _.each(flows, function(flow) {
      var btns = _.filter(flow.nodes, {
        type: 'operation:trigger'
      });
      btns = _.map(btns, function(btn) {
        return {
          flowId: flow.flowId,
          flowName: flow.name,
          triggerId: btn.id,
          triggerName: btn.name
        };
      });
      buttons = buttons.concat(btns);
    });
  });

  main.body('Press select to change group.');
  // Connected
  main.on('click', 'select', function() {
    showFlows();
  });
}

function init() {
  if (octobluApi.isAuthed()) {
    conn = skynetRest.connect(onConnect);
  } else {
    main.body('Unable to authenticate. Please open the settings for this app.');
  }
}

module.exports = {
  init : init
};