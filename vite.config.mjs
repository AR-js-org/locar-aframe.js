import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(import.meta.dirname, 'lib/aframe/main.js'),
            name: 'locar-aframe',
            fileName: format => `locar-aframe.${format}.js`
        },
        rolldownOptions: {
            external: ['three', 'locar'],
            output: {
                globals: {
                    three: 'THREE',
                    locar: 'LocAR'
                }
            }
        }
    }
});
