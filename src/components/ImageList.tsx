import React from 'react';
import ImageItem from './ImageItem'; 
import { data } from '../data';

console.log('data json.....', data);
interface ImageListProps {
    images: any[];
    onLikeToggle: (id: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({ images, onLikeToggle }) => {
    return (
        <div className="image-list">
            {data.map((image, index) => (
                <ImageItem key={index} image={image} onLikeToggle={onLikeToggle} />
            ))}
        </div>
    );
};

export default ImageList;
