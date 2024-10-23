import React, { useState } from 'react';
import { FaThumbsUp, FaRedoAlt } from 'react-icons/fa';
import 'animate.css';

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: { big: string; small: string };
        liked: boolean;
        likes_count: number;
        author: string;
        price: number;
    };
    onLikeToggle: (id: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onLikeToggle }) => {
     // Estado local para gestionar el 'like' de la imagen
    const [isLiked, setIsLiked] = useState(image.liked); 

    const handleLikeClick = () => {
        // Cambia el estado de 'liked'
        setIsLiked(!isLiked); 
        // Ejecuta la función para notificar el cambio 
        onLikeToggle(image.id); 
    };

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
                        className={`like-icon ${isLiked ? 'animate__animated animate__heartBeat' : ''}`} 
                        onClick={handleLikeClick}
                        // Cambia a verde si está "liked"
                        style={{ color: isLiked ? '#11e968' : '#fff' }} 
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
