var ajax = require('ajax'),
    Settings = require('settings'),
    skynetUrl = 'http://skynet.im';

var creds = Settings.data('creds') || {};

function setData(data){
    creds.uuid = data.uuid;
    creds.token = data.token;
    Settings.data('creds', data);
}

var lib = {};

lib.status = function(cb){
    try{
        ajax({
            url: skynetUrl + '/status',
            type: 'json',
            method : 'GET'
        }, function(data){
            console.log('Data', data);
            cb(data);
        });
    }catch(e){
        console.log(skynetUrl + '/status');
        console.log('Error', e);
    }

};

lib.register = function(cb){
    ajax({
        url: skynetUrl + '/devices',
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

module.exports = lib;