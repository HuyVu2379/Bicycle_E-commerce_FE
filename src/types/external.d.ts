// eslint-disable @typescript-eslint/no-unused-vars
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-slick' {
    import * as React from 'react';

    export interface Settings {
        dots?: boolean;
        infinite?: boolean;
        speed?: number;
        slidesToShow?: number;
        slidesToScroll?: number;
        autoplay?: boolean;
        autoplaySpeed?: number;
        pauseOnHover?: boolean;
        swipeToSlide?: boolean;
        responsive?: Array<{
            breakpoint: number;
            settings: any;
        }>;
        [key: string]: any;
    }

    interface SliderProps extends Settings {
        children?: React.ReactNode;
        className?: string;
    }

    export default class Slider extends React.Component<SliderProps> { }
}

declare module 'vanilla-tilt' {
    export interface TiltOptions {
        reverse?: boolean;
        max?: number;
        perspective?: number;
        scale?: number;
        speed?: number;
        transition?: boolean;
        axis?: string | null;
        reset?: boolean;
        easing?: string;
        glare?: boolean;
        'max-glare'?: number;
        'glare-prerender'?: boolean;
        'mouse-event-element'?: string | HTMLElement;
        'reset-to-start'?: boolean;
        gyroscope?: boolean;
        gyroscopeMinAngleX?: number;
        gyroscopeMaxAngleX?: number;
        gyroscopeMinAngleY?: number;
        gyroscopeMaxAngleY?: number;
        gyroscopeSamples?: number;
    }

    export default class VanillaTilt {
        static init(elements: Element | Element[], options?: TiltOptions): void;
        destroy(): void;
    }
}
