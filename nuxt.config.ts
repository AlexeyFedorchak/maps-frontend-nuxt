// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/image', '@nuxtjs/tailwindcss'],
    app: {
        head: {
            link: [
                {rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css'},
            ],
            script: [
                {src: 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js', type: 'text/javascript'},
                {src: 'js/index.js', type: 'text/javascript'},
                {src: 'js/MapColorSelector.js', type: 'text/javascript'},
            ],
        },
    },
    css: [
        'assets/css/maps.css',
    ],
})