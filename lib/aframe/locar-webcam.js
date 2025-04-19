import { Webcam }  from 'locar';

/** locar-webcam
 * A-Frame component representing a webcam feed.
 * Must be added to an A-Frame scene entity.
 * Parameters:
 * idealWidth   (number) - ideal webcam feed to use 
 * idealHeight  (number) - ideal webcam height to use 
 * videoElement (string) - selector representing a video element to stream to, otherwise a video element is created. 
 */
AFRAME.registerComponent("locar-webcam", {
    schema: {
        idealWidth: {
            type: "number",    
            default: 1024
        }, 
        idealHeight: {
            type: "number",
            default: 768
        },
        videoElement: {
             type: "string",
             default: "" 
        }
    },

    init: function() {
        new Webcam({
            idealWidth: this.data.idealWidth,
            idealHeight: this.data.idealHeight,
            onVideoStarted: texture => {
                this.el.object3D.background = texture;
            }
        }, this.data.videoElement || null);

    }
});
