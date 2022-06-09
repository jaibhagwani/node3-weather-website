const request = require('request');

const geocode = (address, callback)=> {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiamFpYmhhZ3dhbmkiLCJhIjoiY2tyNGh0aXRhMTEyczJwcHQzbmJ1dDVhMSJ9.COzbMcTnF52pTfZ9_9h7yw&limit=1';

    request({url, json:true}, (error, {body} = {}) => {
        console.log(error);
        console.log(body);
        if(error){
            callback('Unable to connect to geocode service');
        }
        else if(body.message){
            callback(body.message);
        }
        else if(body.features && body.features.length < 1){
            callback('Unable to find location.');
        }
        else{
            callback(undefined, {
                Lat: body.features[0].center[1],
                Long: body.features[0].center[0],
                Location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;