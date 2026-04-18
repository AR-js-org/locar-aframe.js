import 'aframe';
import 'locar-aframe';

let firstLocation = true;
const locarCamera = document.querySelector('[locar-camera]');
const scene = document.querySelector('a-scene');

locarCamera.addEventListener('gpsupdate', e => {
    // Default location is lat 0, lon 0 so ignore gpsupdate if for this location
    if(
        e.detail.position.coords.latitude != 0 && 
        e.detail.position.coords.longitude != 0 && 
        firstLocation
    ) {
        alert(`Got the initial location: longitude ${e.detail.position.coords.longitude}, latitude ${e.detail.position.coords.latitude}`);

        const boxProps = [{
            latDis: 0.0005,
            lonDis: 0,
            colour: 0xff0000
        }, {
            latDis: -0.0005,
            lonDis: 0,
            colour: 0xffff00
        }, {
            latDis: 0,
            lonDis: -0.0005,
            colour: 0x00ffff
        }, {
            latDis: 0,
            lonDis: 0.0005,
            colour: 0x00ff00
        }];

        for(const boxProp of boxProps) {
            const box = document.createElement("a-box");
            box.setAttribute("locar-entity-place", {
                latitude: e.detail.position.coords.latitude + boxProp.latDis,
                longitude: e.detail.position.coords.longitude + boxProp.lonDis,
            });
            box.setAttribute('material', {
                color: boxProp.colour 
            });
            box.setAttribute('scale', {
                x: 10,
                y: 10,
                z: 10
            });
            scene.appendChild(box);
        }
        
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
