import type { Layout } from '~/types';

export const LOCATION_MAP_LAYOUTS: Layout[] = [
    {
        id: 1,
        name: 'Rectangle',
        shape: 'rectangle',
        preview: '/images/layouts/rectangle.svg'
    },
    {
        id: 2,
        name: 'Circle',
        shape: 'circle',
        preview: '/images/layouts/circle.svg'
    },
    {
        id: 3,
        name: 'Horizontal',
        shape: 'horizontal',
        preview: '/images/layouts/horizontal.svg'
    },
    {
        id: 4,
        name: 'Full Page',
        shape: 'full-page',
        preview: '/images/layouts/full-page.svg'
    },
];