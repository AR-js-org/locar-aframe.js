import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'lib/aframe/main.js'),
            name: 'locar-aframe',
            fileName: format => `locar-aframe.${format}.js`
        },
        rollupOptions: {
            external: ['three', 'locar'],
            output: {
                globals: {
                    three: 'THREE',
                    locar: 'LocAR'
                }
            }
        },
		minify: 'none'
    }
});
