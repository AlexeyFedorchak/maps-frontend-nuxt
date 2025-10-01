import type { Theme } from '~/types';

export const LOCATION_MAP_THEMES: Theme[] = [
    {
        id: 1,
        name: 'Original Black',
        preview: '/images/layouts/Design1.png',
        fullImage: '/images/designs/original-black-full.jpg',
        mapboxStyle: 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi',
        mapTilerStyle: 'https://api.maptiler.com/maps/01997ffa-e996-7490-95ba-c1939af8011e/style.json',
        badge: undefined,
    },
    {
        id: 2,
        name: 'Modern White',
        preview: '/images/layouts/Design2.png',
        fullImage: '/images/designs/modern-white-full.jpg',
        mapboxStyle: 'mapbox://styles/picturethestars/cla9hyyxo000214ny7xj3vejr',
        mapTilerStyle: 'https://api.maptiler.com/maps/streets-v2/style.json',
        badge: 'NEW'
    },
    {
        id: 3,
        name: 'Vintage',
        preview: '/images/layouts/Design3.png',
        fullImage: '/images/designs/vintage-full.jpg',
        mapboxStyle: 'mapbox://styles/picturethestars/cla9hz69s003t14saymfoel6l',
        mapTilerStyle: 'https://api.maptiler.com/maps/basic-v2/style.json',
        badge: undefined
    },
    {
        id: 4,
        name: 'Minimal',
        preview: '/images/layouts/Design4.png',
        fullImage: '/images/designs/minimal-full.jpg',
        mapboxStyle: 'mapbox://styles/picturethestars/cla9hz4fg006515qwu1z4kjh9',
        mapTilerStyle: 'https://api.maptiler.com/maps/bright-v2/style.json',
        badge: undefined
    },
    {
        id: 5,
        name: 'Colorful',
        preview: '/images/layouts/Design5.png',
        fullImage: '/images/designs/colorful-full.jpg',
        mapboxStyle: 'mapbox://styles/picturethestars/cla9hz0z000x715mgxs7g6m7d',
        mapTilerStyle: 'https://api.maptiler.com/maps/pastel-v2/style.json',
        badge: undefined
    },
    {
        id: 6,
        name: 'Dark Modern',
        preview: '/images/layouts/Design6.png',
        mapboxStyle: 'mapbox://styles/picturethestars/cla9hz2si000r14ohss4vu28q',
        mapTilerStyle: 'https://api.maptiler.com/maps/topo-v2/style.json',
        badge: undefined
    },
];
