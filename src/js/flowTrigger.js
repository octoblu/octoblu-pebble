'use strict';

var skynetRest = require('./skynetRest.js');

module.exports = function(flowId, buttonId){
	skynetRest.message({
    devices : flowId,
    topic : 'button',
    payload : {
        from : buttonId
    }
  }, function(data){
  	console.log('Message Sent', JSON.stringify(data));
  }, function(err){
  	console.log('Message Error', JSON.stringify(err));
  });
};