
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
    },

    update: function(oldData) {
        if(!this.locarCamera) {
            console.error('Cannot update locar-entity-place without a locar-camera component on the scene camera.');
        }
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
