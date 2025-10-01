export interface GreetingCard {
    id: string;
    type: 'card';
    title: string;
    subTitle: string;
    price: number;
}

export const GREETING_CARDS: GreetingCard[] = [
    {
        id: 'greeting-card',
        type: 'card',
        title: 'GREETINGS CARD',
        subTitle: 'Add personal message',
        price: 249,
    },
];
