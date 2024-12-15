const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hhbW5wIiwiYSI6ImNtNGhib2lsZjA1ZzEybHB5Z3dzaGZ2c2EifQ.UngPul8CXEJbMy5Dwr8ybg&limit=1`;

  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location service', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      const latitude = body.features[0].geometry.coordinates[1];  
      const longitude = body.features[0].geometry.coordinates[0]; 
      const location = body.features[0].place_name;  

      callback(undefined, {
        latitude,
        longitude,
        location
      });
    }
  });
};

module.exports = geocode;
