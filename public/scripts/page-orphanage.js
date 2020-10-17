const options = new Object({
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
})
//get values from html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng
//create map
//setView ( [ LAT, LONG], ZOOM )
const map = L.map("mapid", options).setView([lat, lng], 15);

//create and add title layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});



//create and add marker

L.marker([lat, lng], { icon }).addTo(map);


// Image gallery

function selectImage(e){
    const btn = e.currentTarget;
    
    //remover todas as classes active
    const btns = document.querySelectorAll('.images button');

    
    btns.forEach((element)=>{

        if( !(element.getAttribute('class'))){
            return;
        }

        element.classList.remove('active');
    })

    
    //selecionar a imagen clicada
    let image = btn.children[0];

    const imgContainer = document.querySelector('.orphanage-details > img');

    //atualizar o container de imagem
    imgContainer.src = image.src;

    //adicionar a classe .active para este botão
    btn.classList.add('active');
}