const request = require('postman-request');

const weather = (latitude, longitude, unit, callback) =>{
  const url = `https://api.weatherstack.com/current?access_key=d94e714d7ac5cc5687e7c9dc594bae22&query=${latitude},${longitude}&units=${unit}`

  request({url: url, json: true}, (error, {body} = {}) =>{
    if(error){
      callback('Unable to connect to weather service', undefined)
    } else if(body.error){
      callback('Unable to find location. Try another location.', undefined)
    }
    callback(undefined, {
      currentTime: body.current.observation_time,
      timezone: body.location.timezone_id,
      weatherIcon: body.current.weather_icons[0],
      description: `${body.current.weather_descriptions}, the temperature is ${body.current.temperature} degrees ${unit ==='f'? 'F': unit === 'm'? 'M': unit === 's' ? 'K': null} and it feels like ${body.current.feelslike} degrees ${unit ==='f'? 'F': unit === 'm'? 'M': unit === 's' ? 'K': null}.`})
  })
}



module.exports = weather;