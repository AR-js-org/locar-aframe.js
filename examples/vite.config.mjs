import { defineConfig } from 'vite';
import { resolve } from 'path';

const entries = { main: 'index.html' };
['basic', 'with-js', 'with-api-comm'].forEach ( example => {
    entries[example] = resolve(__dirname, `${example}/index.html`);
});

export default defineConfig({
    build: {
        outDir: '../docs',
        rollupOptions: {
            input: entries 
        }
    }
});
