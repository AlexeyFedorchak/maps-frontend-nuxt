const PRODUCT_TYPES = {
    JEWELRY: 'jewelry',
    POSTER: 'poster',
} as const;

type ProductType = typeof PRODUCT_TYPES[keyof typeof PRODUCT_TYPES];
