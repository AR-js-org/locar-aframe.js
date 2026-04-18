import 'aframe';
import 'aframe-look-at-component';
import 'locar-aframe';

let firstLocation = true;
const locarCamera = document.querySelector('[locar-camera]');
const scene = document.querySelector('a-scene');

locarCamera.addEventListener('gpsupdate', async(e) => {
    const pos = e.detail.position;
    // Default location is lat 0, lon 0 so ignore gpsupdate if for this location
    if(
        pos.coords.latitude != 0 && 
        pos.coords.longitude != 0 && 
        firstLocation
    ) {
        alert(`Got the initial location: longitude ${pos.coords.longitude}, latitude ${pos.coords.latitude}`);
       
        const response = await fetch(`https://hikar.org/webapp/map?bbox=${pos.coords.longitude-0.02},${pos.coords.latitude-0.02},${pos.coords.longitude+0.02},${pos.coords.latitude+0.02}&layers=poi&outProj=4326`);
        const pois = await response.json();
        pois.features.forEach ( poi => {
            const image = document.createElement("a-image");
            image.setAttribute("src", "#map-marker");
            image.setAttribute('scale', '20 20 20');
            const text = document.createElement("a-entity");
            text.setAttribute("text", {
                value: poi.properties.name || "No name",
                align: 'center'
            });
            text.setAttribute('scale', '100 100 100');
            text.setAttribute('look-at', '[camera]');
            const composite = document.createElement("a-entity");
            composite.setAttribute("locar-entity-place", {
                latitude: parseFloat(poi.geometry.coordinates[1]),
                longitude: parseFloat(poi.geometry.coordinates[0])
            });
            image.setAttribute("position", { y: 20 } );
            composite.appendChild(image);
            composite.appendChild(text);
            scene.appendChild(composite);
        });
 
        firstLocation = false;
    }
});

document.querySelector('#setFakeLoc').addEventListener('click', e => {
    const lat = document.getElementById('fakeLat').value;
    const lon = document.getElementById('fakeLon').value;
    locarCamera.setAttribute('locar-camera', {
        simulateLatitude: parseFloat(lat),
        simulateLongitude: parseFloat(lon)
    });
});
