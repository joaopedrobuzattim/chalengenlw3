if (document.querySelector(".focus-location span")) {
  let focuslat = document.querySelector(".focus-location span").dataset
    .focuslat;
  let focuslng = document.querySelector(".focus-location span").dataset
    .focuslng;
  var map = L.map("mapid").setView([focuslat, focuslng], 17);
} else {
  var map = L.map("mapid").setView([-29.700906, -53.8154484], 15);
}

//create and add title layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

//desctructuring de elementos do objeto orphanage
function addMarker({ id, name, lat, lng }) {
  //create popu
  const popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240,
  }).setContent(
    `${name} <a href="/orphanage?id=${id}"> <img src="/images/arrow-white.svg "> </a`
  );

  //create and add marker
  L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
}

const orphanagesSpan = document.querySelectorAll(".orphanages span");

orphanagesSpan.forEach((el) => {
  const orphanage = {
    id: el.dataset.id,
    name: el.dataset.name,
    lat: el.dataset.lat,
    lng: el.dataset.lng,
  };

  addMarker(orphanage);
});
