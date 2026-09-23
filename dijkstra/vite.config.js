import { defineConfig } from 'vite'

export default defineConfig({

    build: {
        lib: {
            entry: ['src/main.js'],
            name: "dijkstra",
            fileName: (format, entryName) => `dijkstra.${format}.js`,
            cssFileName: 'style',
        },
        rolldownOptions: {
        },
    },
})