//create map
//setView ( [ LAT, LONG], ZOOM )
const map = L.map("mapid").setView([-29.700906, -53.8154484], 15);

//create and add title layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

//create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68]
});


let marker;

//create and add marker
map.on('click',(e)=>{
        
   const lat = e.latlng.lat;
   const lng = e.latlng.lng;

   
   marker && map.removeLayer(marker);
   
   marker = L.marker([lat,lng],{icon})
   .addTo(map);

   document.querySelector('[name=lat]').value = lat;
   document.querySelector('[name=lng]').value = lng;
   
})

//add marker by searching  the address
async function addMarkerBySearch(e){

    e.preventDefault();
    let address = document.querySelector('.search-input-container input').value;
    const parsedAddress = address.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g, "+");
    const url = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress}&key=AIzaSyDk4HWqPCuAR-8JxW09zKOuvhFAZHhA2s0`
    );
    const geolocation = await url.json();
    const geolocationObject = geolocation.results[0].geometry.location;

    const { lat, lng } = geolocationObject;

    marker && map.removeLayer(marker);
    map.setView([lat,lng], 17)

    marker = L.marker([lat,lng],{icon})
    .addTo(map);
}

//adicionar o campo de fotos
function addPhotoField(){
    
    //pegar o container de fotos #images
    const container = document.querySelector('#images')
    //pegar o container para duplicar .new-upload
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //realizar o clone da última imagem adicionana 
    const newFieldContainer = fieldsContainer[ fieldsContainer.length - 1 ].cloneNode(true);
    //verificar se o campo esta vazio
    const input = newFieldContainer.children[0];
    if(input.value == ""){
        return
    }
    //limpar o campo antes de adicionar ao container de imagens
    newFieldContainer.children[0].value = " ";
    //adicionar o clone ao container de imagens
    container.appendChild(newFieldContainer);
}

function deleteField(e){

    const span = e.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if(fieldsContainer.length <= 1){
        //limpar o campo
        span.parentNode.children[0].value = "";
        return;
    }

    //deletar o campo
    span.parentNode.remove();


}

//troca da seleção sim e não 
function toggleSelect(e){

    //remove a classe active
    document.querySelectorAll('.button-select button')
    .forEach(  el => el.classList.remove('active'))

    //pegar o botão clicado
    //colocar a classe acive nesse botão clicado
    const button = e.currentTarget;
    button.classList.add('active');    

    //atualizar o input hidden com o valor selecionado

    const input = document.querySelector("[name=open_on_weekends]");
    
    //atualizar se sim ou não
    input.value = button.dataset.value;
    

}