export const STAR_MAP_FEATURES: any[] = [
    {
        id: 0,
        name: 'Constellations',
        isSelected: false,
        actionType: 'celestial',
        rewriteConfig: {
            constellations: { show: true, lines: true },
        }
    },
    {
        id: 1,
        name: 'Coordinates',
        isSelected: false,
        actionType: 'celestial',
        rewriteConfig: {
            lines: { graticule: { show: true } },
        }
    },
    {
        id: 2,
        name: 'Border',
        isSelected: true,
        actionType: 'ui',
    },
    {
        id: 3,
        name: 'Background',
        isSelected: true,
        actionType: 'ui',
    },
    {
        id: 4,
        name: 'Grid Map',
        isSelected: false,
        actionType: 'celestial',
    },
];