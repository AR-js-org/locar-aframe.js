import { DeviceOrientationControls, LocationBased } from 'locar';

/** locar-camera
 * A-Frame component representing a GPS-aware camera.
 * Must be added to an A-Frame camera entity e.g. <a-camera> or <a-entity camera>
 * Parameters:
 * simulateLatitude    (number) - fake latitude to use
 * simulateLongitude   (number) - fake latitude to use
 * simulateAltitude    (number) - fake altitude to use
 * positionMinAccuracy (number) - minimum accuracy in metres for GPS positions to be accepted.
 */
AFRAME.registerComponent("locar-camera", {
    schema: {
        simulateLatitude: {
            type: "number",
            default: 0,
        }, 
        simulateLongitude: {
            type: "number",
            default: 0,
        },
        simulateAltitude: {
            type: "number",
            default: -Number.MAX_VALUE,
        },
        positionMinAccuracy: {
            type: "number",
            default: 100,
        }
    },

    init: function() {
        this.locar = new LocationBased(    
            this.el.sceneEl.object3D,
            this.el.object3D
        );

        this.locar.on("gpsupdate", (position, distMoved) => {
            this.el.emit("gpsupdate", {
                position,
                distMoved
            });
        });

        this.locar.on("gpserror", code => {
            const msg = [
                "User denied access to GPS.",
                "GPS satellites not available.",
                "Timeout communicating with GPS satellites - try moving to a more open area.",
              ];
              if (code >= 1 && code <= 3) {
                alert(msg[code - 1]);
              } else {
                alert(`Unknown geolocation error code ${code}.`);
              }
        });

        if(this._isMobile()) {
            this.deviceOrientationControls = new DeviceOrientationControls(this.el.object3D);
        }
    },

    update: function(oldData) {
        this.locar.setGpsOptions({
            gpsMinAccuracy: this.data.positionMinAccuracy,
            gpsMinDistance: this.data.gpsMinDistance
        });

        if(this.data.simulateLatitude != oldData?.simulateLatitude ||
           this.data.simulateLongitude != oldData?.simulateLongitude
        ) {
            this.locar.stopGps();
            this.locar.fakeGps(
                this.data.simulateLongitude, 
                this.data.simulateLatitude
            );
            this.data.simulateLongitude = 0;
            this.data.simulateLatitude = 0;
        }

        if(this.data.simulateAltitude > -Number.MAX_VALUE) {
            this.locar.setElevation(this.data.simulateAltitude + 1.6);
        }
    },

    play: function() {
        this.locar.startGps();
    },

    pause: function() {
        this.locar.stopGps();
    },

    /**
     * Convert longitude and latitude to three.js/WebGL world coordinates.
     * Uses the specified projection, and negates the northing (in typical
     * projections, northings increase northwards, but in the WebGL coordinate
     * system, we face negative z if the camera is at the origin with default
     * rotation).
     * @param {number} lon - The longitude.
     * @param {number} lat - The latitude.
     * @return {Array} a two member array containing the WebGL x and z coordinates
     */
    lonLatToWorldCoords: function(lon, lat) {
        return this.locar.lonLatToWorldCoords(lon, lat);
    },

    tick: function() {
        this.deviceOrientationControls?.update();
    },

    _isMobile: function () {
        return (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
                .test(
                    navigator.userAgent,
                )
         ) ||
         (/Macintosh/i.test(navigator.userAgent) &&
            navigator.maxTouchPoints != null &&
            navigator.maxTouchPoints > 1); // for iPad Safari
    },
});
