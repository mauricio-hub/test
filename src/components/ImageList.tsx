import React from 'react';
import ImageItem from './ImageItem';


interface ImageListProps {
    images: any[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
    return (
        <div className="image-list">
            {images.map((image) => (
                <ImageItem key={image.id} image={image} />
            ))}
        </div>
    );
};

export default ImageList;
