// src/components/ImageList.tsx
import React from 'react';
import ImageItem from './ImageItem';

interface ImageListProps {
    images: any[];
    onLikeToggle: (id: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onLikeToggle }) => {
    return (
        <div className="image-list">
            {images.map((image,index) => (
                <ImageItem key={index} image={image} onLikeToggle={onLikeToggle} />
            ))}
        </div>
    );
};

export default ImageList;

