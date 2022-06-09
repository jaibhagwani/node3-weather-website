const request = require('request');

const forecast =(lat, long, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=0874dc3e7dd3c8e5a15788286e4aaee1&query='+lat +','+ long;

    request({url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service.');
        }
        else if(body.error){
            callback('Please provide valid location identifiers.')
        }
        else{
            callback(undefined, "Is is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degrees out.");
        }
    })
}

module.exports = forecast;
