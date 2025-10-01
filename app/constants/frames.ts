export interface Frame {
  id: string | number;
  type?: 'frame';
  name: string;
  title?: string;
  subTitle?: string;
  className?: string;
  price: number;
  image?: string;
  backgroundImage?: string;
  thumbnail?: string;
}

export const FRAMES: Frame[] = [
  {
    id: '1',
    type: 'frame',
    name: 'Black Frame',
    title: 'BLACK FRAME',
    subTitle: 'Classic black frame',
    className: 'black-frame',
    price: 2499,
    backgroundImage: '/images/frames/frame-black.png',
    image: '/images/frames/frame-black.png',
  },
  {
    id: '2',
    type: 'frame',
    name: 'White Frame',
    title: 'WHITE FRAME',
    subTitle: 'Clean white frame',
    className: 'white-frame',
    price: 2499,
    backgroundImage: '/images/frames/frame-white.png',
    image: '/images/frames/frame-white.png',

  },
  {
    id: '3',
    type: 'frame',
    name: 'Natural Frame',
    title: 'NATURAL FRAME',
    subTitle: 'Wooden natural frame',
    className: 'natural-frame',
    price: 2499,
    backgroundImage: '/images/frames/frame-wood.png',
    image: '/images/frames/frame-wood.png',
  },
]
