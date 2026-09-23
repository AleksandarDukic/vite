import { defineConfig } from 'vite'

export default defineConfig({

    build: {
        lib: {
            entry: ['src/main.js'],
            name: "test",
            fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
            cssFileName: 'style',
        },
        rolldownOptions: {
        },
    },
})