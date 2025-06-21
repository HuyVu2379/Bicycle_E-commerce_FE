import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { GalleryPhoto } from '@/pages/admin/Product';

interface ImageLightboxProps {
    isOpen: boolean;
    currentImage: number;
    photos: GalleryPhoto[];
    closeLightbox: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, currentImage, photos, closeLightbox }) => {
    const slides = photos.map((photo, index) => ({
        src: photo.src,
        alt: `Image ${index}`,
        width: photo.width,
        height: photo.height
    }));

    return (
        <Lightbox
            open={isOpen}
            close={closeLightbox}
            slides={slides}
            index={currentImage}
        />
    );
};

export default ImageLightbox;