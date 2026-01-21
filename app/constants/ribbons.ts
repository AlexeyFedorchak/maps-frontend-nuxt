export interface Ribbon {
    id: string;
    type: 'ribbon';
    title: string;
    subTitle: string;
    price: number;
}

export const RIBBONS: Ribbon[] = [
    {
        id: 'ribbon',
        type: 'ribbon',
        title: 'RIBBON',
        subTitle: 'Ribbon gift wrap',
        price: 249,
    },
];
