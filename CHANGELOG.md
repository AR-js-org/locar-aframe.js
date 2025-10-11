# Updates

## 0.1.2 (2025-10-11)

Now handles the possibility of `locar-camera` not being initialised when we try to set the position of a `locar-entity-place` (see issue #3). This appears to occur when we attach `locar-entity-place` to `a-entity` entities, rather than specific primitives such as `a-box`.

## 0.1.1 (2025-08-25)

`locar-camera` Now takes `enablePermissionDialog` parameter, matching the three.js API and allowing customisation of the iOS permissions dialog. Many thanks to @darianwwu for this!

## 0.1.0 (2025-08-23)

Compatible with version 0.1.0 of [locar.js](https://github.com/AR-js-org/locar.js).

## Pre 0.1.0

- `0.0.3` (2025-05-25) - added `smoothingFactor` property to `locar-camera` component, as per original AR.js.

- `0.0.1` (2025-04-19) - separated out A-Frame components into own package. A-Frame components are: `locar-webcam`, `locar-camera` and `locar-entity-place`, with the latter two more or less equivalent to the original AR.js `gps-new-camera` and `gps-new-entity-place` components but with some parameter changes.

