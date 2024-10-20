import React from 'react';

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: { big: string; small: string };
        liked: boolean;
        likes_count: number;
    };
    onLikeToggle: (id: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onLikeToggle }) => {
    return (
        <div className="image-item">
            <img src={image.main_attachment.big} alt={image.title} />
            <h3>{image.title}</h3>
            <button onClick={() => onLikeToggle(image.id)}>
                {image.liked ? 'Unlike' : 'Like'} ({image.likes_count})
            </button>
        </div>
    );
};

export default ImageItem;
