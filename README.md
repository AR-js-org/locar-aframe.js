# locar-aframe.js 

Location-based AR from AR.js - A-Frame components.

A-Frame components include: 

- `locar-webcam` representing the webcam feed 
- `locar-camera` representing a GPS-enabled camera
- `locar-entity-place` allowing entities to be positioned using latitude and longitude.

The latter two are more or less equivalent to the original AR.js `gps-new-camera` and `gps-new-entity-place` components but with some parameter changes.

## locar-webcam

A-Frame component representing a webcam feed.
Must be added to an A-Frame scene entity.

Parameters:

- `idealWidth`  (number) - ideal webcam feed to use 
- `idealHeight`  (number) - ideal webcam height to use 
- `videoElement` (string) - selector representing a video element to stream to, otherwise a video element is created. 

## locar-camera

A-Frame component representing a GPS-aware camera.
Must be added to an A-Frame camera entity e.g. `<a-camera>` or `<a-entity camera>`

Parameters:

- `simulateLatitude`    (number) - fake latitude to use
- `simulateLongitude`   (number) - fake latitude to use
- `simulateAltitude`    (number) - fake altitude to use
- `positionMinAccuracy` (number) - minimum accuracy in metres for GPS positions to be accepted.

## locar-entity-place

A-Frame component representing an entity which can be added at a given latitude and longitude.

Parameters:

- `latitude`  (number) - latitude of the entity 
- `longitude` (number) - longitude of the entity 
