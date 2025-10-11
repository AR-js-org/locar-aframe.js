
/** locar-entity-place
 * A-Frame component representing an entity which can be added at a given latitude and longitude.
 * Parameters:
 * latitude  (number) - latitude of the entity 
 * longitude (number) - longitude of the entity 
 */
AFRAME.registerComponent("locar-entity-place", {
    schema: {
        latitude: {
            type : "number",
            default : 0,
        }, 
        longitude: {
            type:"number",
            default : 0
        }
    },

    init: function() {
        const locarEl = this.el.sceneEl.querySelector("[locar-camera]");
        this.locarCamera = locarEl.components["locar-camera"];
        // If locar-camera isn't ready, wait for the initial 
        // GPS position and then set the projected coords
        if(!this.locarCamera) {
            locarEl.addEventListener("gps-initial-position-determined", e => {
                this.locarCamera = locarEl.components["locar-camera"];
                this._applyProjectedCoordinates();
            });
       }
    },

    update: function(oldData) {
        // It's possible locar-camera isn't initialised (issue #3)
        if(this.locarCamera) {
            this._applyProjectedCoordinates();
        }
    },

    _applyProjectedCoordinates: function() {
        const projCoords = this.locarCamera.lonLatToWorldCoords(
            this.data.longitude,     
            this.data.latitude
        );
        this.el.object3D.position.set(
            projCoords[0],
            this.el.object3D.position.y,
            projCoords[1]
        );
    }
});
