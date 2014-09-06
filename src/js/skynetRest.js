'use strict';

var ajax = require('ajax'),
    Settings = require('settings'),
    meshbluUrl = 'http://meshblu.octoblu.com';

var creds = Settings.data('creds') || {};

function setData(data){
    creds.uuid = data.uuid;
    creds.token = data.token;
    Settings.data('creds', data);
}

var lib = {};

lib.status = function(cb){

    ajax({
        url: meshbluUrl + '/status',
        type: 'json',
        method: 'GET'
    }, function (data) {
        console.log('Data: ', data);
        cb(data);
    }, function (err) {
        console.log('Error: ', err);
        cb({ skynet: 'offline' });
    });

};

lib.register = function(cb){

    ajax({
        url: meshbluUrl + '/devices',
        type: 'json',
        method : 'GET',
        data : {
            type : 'pebble'
        }
    }, function(data){
        console.log(data);

        setData(data);
        cb(data);

    });
};

lib.connect = function(cb){

    if(creds.uuid && creds.token){
        cb(creds);
    }else{
        lib.register(cb);
    }

};

lib.message = function(data, resolve, reject){

    console.log('Sending Message');

    ajax({
        url : meshbluUrl + '/messages',
        type : 'json',
        method : 'POST',
        headers : {
            skynet_auth_uuid : creds.uuid,
            skynet_auth_token : creds.token
        },
        data : data
    }, function(data){
        console.log('Sent Message', data);
        resolve(data);
    }, function(err){
        console.log('Error Sending Message', err);
        reject(err);
    });

};

module.exports = lib;