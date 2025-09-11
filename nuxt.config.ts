// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/image', '@pinia/nuxt', 'shadcn-nuxt', '@vueuse/nuxt'],
    pinia: {
        // Prevent auto import.
        storesDirs: [],
    },
    runtimeConfig: {
        public: {
            mapboxToken: process.env.NUXT_MAPBOX_TOKEN,
        },
    },
    app: {
        head: {
            link: [
                {rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'},
            ],
            script: [
                {src: 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js', type: 'text/javascript'},
            ],
        },
    },
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/maps.css',
        '~/assets/css/styles.css',
        '~/assets/css/fonts.css',
    ],
    vite: {
        plugins: [
            tailwindcss(),
        ],
        build: {
            sourcemap: process.env.NODE_ENV !== 'production',
        },
    },
    shadcn: {
        componentDir: './app/components/ui',
    },
    nitro: {
        prerender: {
            routes: ['/product/location-map', '/product/star-map'],
        },
    },
});