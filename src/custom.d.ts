// src/custom.d.ts
declare module 'swiper/element/bundle';

declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'space-between'?: string;
      'slides-per-view'?: string;
      autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
      loop?: boolean;
    };
    'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}