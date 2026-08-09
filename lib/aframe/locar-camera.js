import { DeviceOrientationControls, LocAR } from 'locar';

/** locar-camera
 * A-Frame component representing a GPS-aware camera.
 * Must be added to an A-Frame camera entity e.g. <a-camera> or <a-entity camera>
 * Parameters:
 * simulateLatitude           (number)  - fake latitude to use
 * simulateLongitude          (number)  - fake longitude to use
 * simulateAltitude           (number)  - fake altitude to use
 * positionMinAccuracy        (number)  - minimum accuracy in metres for GPS positions to be accepted.
 * smoothingFactor            (number)  - smoothing factor to use for sensors
 * enablePermissionDialog     (boolean) - On iOS, enable permission dialog to seek permission to use device orientation through a user gesture. Recommended to set to true 
 * enableStyling              (boolean) - Set iOS-look and feel styling for the permission dialog for device orientation
 * preferConfirmDialog        (boolean) - Use a standard confirm dialog rather than a custom element to grant device orientation permissions 
 * orientationChangeThreshold (number)  - threshold in radians to detect orienation change
 */
AFRAME.registerComponent("locar-camera", {
    schema: {
        simulateLatitude: {
            type: "number",
            default: 0
        },
        simulateLongitude: {
            type: "number",
            default: 0
        },
        simulateAltitude: {
            type: "number",
            default: -Number.MAX_VALUE
        },
        positionMinAccuracy: {
            type: "number",
            default: 100
        },
        smoothingFactor: {
            type: "number",
            default: 0.2
        },
        enablePermissionDialog: {
            type: "boolean",
            default: true
        },
        enableStyling: {
            type: "boolean",
            default: true
        },
        preferConfirmDialog: {
            type: "boolean",
            default: false
        },
        orientationChangeThreshold: {
            type: "number",
            default: 0
        },
    },

    init: function () {
        this.hasPosition = false;
        this.locar = new LocAR(
            this.el.sceneEl.object3D,
            this.el.object3D
        );

        this.locar.on("gpsupdate", ev => {
            this.el.emit("gpsupdate", ev);
            if (!this.hasPosition) {
                this.el.emit("gps-initial-position-determined", ev);
                this.hasPosition = true;
            }
        });

        this.locar.on("gpserror", ev => {
            this.el.emit("gpserror", ev);
        });

        if (this._isMobile()) {
            this.deviceOrientationControls = new DeviceOrientationControls(
                this.el.object3D,
                {
                    smoothingFactor: this.data.smoothingFactor,
                    enablePermissionDialog: this.data.enablePermissionDialog,
                    enableInlineStyling: this.data.enableStyling,
                    preferConfirmDialog: this.data.preferConfirmDialog,
                    orientationChangeThreshold: this.data.orientationChangeThreshold
                });

            this.deviceOrientationControls.on("deviceorientationgranted", ev => {
                ev.target.connect();
            });

            this.deviceOrientationControls.on("deviceorientationerror", error => {
                alert(`Device orientation error: code ${error.code} message ${error.message}`);
            });

            this.deviceOrientationControls.init();
        }
    },

    update: function (oldData) {
        this.locar.setGpsOptions({
            gpsMinAccuracy: this.data.positionMinAccuracy,
            gpsMinDistance: this.data.gpsMinDistance
        });

        if (this.data.simulateLatitude != oldData?.simulateLatitude ||
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

        if (this.data.simulateAltitude > -Number.MAX_VALUE) {
            this.locar.setElevation(this.data.simulateAltitude + 1.6);
        }
    },

    play: function () {
        this.locar.startGps();
    },

    pause: function () {
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
    lonLatToWorldCoords: function (lon, lat) {
        return this.locar.lonLatToWorldCoords(lon, lat);
    },

    tick: function () {
        this.deviceOrientationControls?.update();
    },

    positionFound: function () {
        return this.hasPosition;
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
