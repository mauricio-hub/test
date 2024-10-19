import React from 'react';

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: {
            small: string;
        };
        likes_count: number;
        liked: boolean;
    };
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
    return (
        <div className="image-item">
            <img src={image.main_attachment.small} alt={image.title} />
            <h3>{image.title}</h3>
            <p>{image.likes_count} Likes</p>
        </div>
    );
};

export default ImageItem;
