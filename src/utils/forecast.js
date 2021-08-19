const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=98304b17c415c9a2cde4a5423e11702c&query='+lat+','+long+''
    console.log(url);
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast