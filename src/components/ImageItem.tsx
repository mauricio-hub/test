import React from 'react';
import { FaThumbsUp, FaRedoAlt } from 'react-icons/fa'; 

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: { big: string; small: string };
        liked: boolean;
        likes_count: number;
        reload_count: number; 
        author:  string ;
        price: number; 
    };
    onLikeToggle: (id: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onLikeToggle }) => {
    return (
        <div className="image-item">
            <div className="price-tag">
                {image.price.toFixed(2)} <span style={{ fontSize: '10px' }}>€</span>
            </div>
            <img src={image.main_attachment.big} alt={image.title} />
            <div className="image-info">
                <h3>{image.title.toUpperCase()}</h3>
                <p>by {image.author}</p>
            </div>
            <div className="icon-section">
                <div className="like-section">
                    <FaThumbsUp
                        className="like-icon"
                        onClick={() => onLikeToggle(image.id)}
                        style={{ color: '#fff'  }}
                    />
                    <span style={{ color: '#fff' }}>00{image.likes_count}</span>
                </div>
                <div className="reload-section">
                    <FaRedoAlt className="reload-icon" />
                    <span style={{ color: '#fff' }}>000</span>
                </div>
            </div>
        </div>
    );
};

export default ImageItem;
