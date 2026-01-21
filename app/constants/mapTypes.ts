// Map preview constants
export const MAP_TYPES = {
    STARMAP: 'starmap',
    LOCATIONMAP: 'locationmap'
} as const;

export const MAP_ELEMENT_IDS = {
    STARMAP_PREVIEW: 'starmap-preview',
    LOCATIONMAP_PREVIEW: 'locationmap-preview'
} as const;

export type MapType = typeof MAP_TYPES[keyof typeof MAP_TYPES];
