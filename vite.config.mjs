// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, {transformAssetUrls} from 'vite-plugin-vuetify'

// Utilities
import {defineConfig} from 'vite'
import {fileURLToPath, URL} from 'node:url'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter(),
        Layouts(),
        Vue({
            template: {transformAssetUrls}
        }),
        // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
        Vuetify({
            autoImport: true,
            // styles: {
            //     configFile: 'src/assets/styles/settings.scss',
            // },
        }),
        Components(),
        Fonts({
            google: {
                families: [{
                    name: 'Roboto',
                    styles: 'wght@100;300;400;500;700;900',
                }],
            },
        }),
        AutoImport({
            imports: [
                'vue',
                'vue-router',
            ],
            eslintrc: {
                enabled: true,
            },
            vueTemplate: true,
        }),
    ],
    define: {
        'process.env': {
            SERVER_ADDRESS: process.env.VUE_APP_SERVER_ADDRESS
        }
    },
    resolve: {
        mainFields: [
            'browser',
            'module',
            'main',
            'jsnext:main',
            'jsnext'
        ],
        alias: {
            '@/public': fileURLToPath(new URL('../public', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
        extensions: [
            '.js',
            '.json',
            '.jsx',
            '.mjs',
            '.ts',
            '.tsx',
            '.vue',
        ],
    },
    server: {
        port: 8081,
    },
    build: {
        rollupOptions: {
            output: {
                // dir: '~/plugin/assets/',
                // dir: '/assets/',
                // entryFileNames: 'plugin.js',
                // assetFileNames: 'plugin.css',
                // chunkFileNames: 'chunk.js',
                manualChunks: undefined,
            },
        }
    }
    // experimental: {
    //     renderBuiltUrl(filename, {hostId, hostType, type}) {
    //         if (type == 'public') {
    //             return 'https://localhost:8585/' + filename;
    //         } else if (path.extname(hostId) === 'js') {
    //             return {
    //                 runtime: 'salam'
    //             }
    //         }
    //     }
    // }
})
