export interface WallStrip {
    id: string;
    type: 'wall-strip';
    title: string;
    subTitle: string;
    price: number;
}

export const WALL_STRIPS: WallStrip[] = [
    {
        id: 'wall-strips',
        type: 'wall-strip',
        title: 'WALL STRIPS',
        subTitle: 'Easy hassle-free fixture',
        price: 249,
    },
];
