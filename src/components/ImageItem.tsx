import React from 'react';
import { FaThumbsUp } from 'react-icons/fa'; // Importa el ícono

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: { big: string; small: string };
        liked: boolean;
        likes_count: number;
        author: { name: string };
    };
    onLikeToggle: (id: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onLikeToggle }) => {
    return (
        <div className="image-item">
            <img src={image.main_attachment.big} alt={image.title} />
            <h3>{image.title}</h3>
            <p>{image.author.name}</p> {/* Agregado para mostrar el autor */}
            <FaThumbsUp 
                direction={image.liked ? 'up' : 'down'}
                className="like-icon" 
                onClick={() => onLikeToggle(image.id)} 
                style={{ color: image.liked ? '#02ee8c' : '#ff0000' }} // Cambia el color según si está 'liked' o no
            />
            <span>{image.likes_count}</span> {/* Muestra la cantidad de likes */}
        </div>
    );
};

export default ImageItem;
