'use strict';

var ajax = require('ajax'),
    Settings = require('settings'),
    skynetRest = require('./skynetRest.js'),
    _ = require('./lodash'),
    octobluUrl = 'http://app.octoblu.com';

var octobluCreds = Settings.data('octobluCreds') || {};

var lib = {};

lib.setData = function(data){
    octobluCreds.uuid = data.uuid;
    octobluCreds.token = data.token;
    Settings.data('octobluCreds', data);
};

lib.getFlows = function(cb){

    ajax({
        url: octobluUrl + '/api/flows',
        type: 'json',
        method: 'GET',
        headers : {
            skynet_auth_uuid : octobluCreds.uuid,
            skynet_auth_token : octobluCreds.token
        }
    }, function (data) {
        console.log('Flow Data: ', data);
        cb(data);
    }, function (err) {
        console.log('Error: ', err);
        cb(err);
    });

};

lib.isAuthed = function(){
  return !_.isUndefined(octobluCreds.uuid);
};

lib.triggerFlow = function(trigger){
  if(!trigger){
    console.log('No Trigger');
    return;
  }
  skynetRest.octobluMessage({
    devices : trigger.flowId,
    topic : 'button',
    payload : {
        from : trigger.triggerId
    }
  }, function(data){
    console.log('Trigger Sent', JSON.stringify(data));
  }, function(err){
    console.log('Trigger Error', JSON.stringify(err));
  });
};

module.exports = lib;