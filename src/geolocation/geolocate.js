const fetch = require("node-fetch");

module.exports = function (address) {
  const parsedAddress = address
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "+");

  const coordenates = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=INSERT_YOUR_API_KEY_HERE`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      let geolocationObject = data.results[0].geometry.location;
      const { lat, lng } = geolocationObject;
      const latLngFocus = { lat, lng };
      return latLngFocus;
    });

  return coordenates;
};
