import { Webcam } from 'locar';

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
            default: 0
        },
        idealHeight: {
            type: "number",
            default: 0
        },
        videoElement: {
            type: "string",
            default: ""
        }
    },

    init: function () {
        const cam = new Webcam({
            video: (this.data.idealWidth && this.data.idealHeight) ? {
                facingMode: 'environment',
                width: { ideal: this.data.idealWidth },
                height: { ideal: this.data.idealHeight }
            } : {
                facingMode: 'environment'
            }
        }, this.data.videoElement || null);

        cam.on("webcamstarted", ev => {
            this.el.object3D.background = ev.texture;
        });

        cam.on("webcamerror", error => {
            this.el.emit("webcamerror", error);
        });
    }
});
