/* import React from 'react';
import { FaThumbsUp } from 'react-icons/fa';

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: { big: string; small: string };
        liked: boolean;
        likes_count: number;
        author: { name: string };
        price: number; 
    };
    onLikeToggle: (id: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onLikeToggle }) => {
    return (
        <div className="image-item">
            <div className="price-tag">{image.price.toFixed(2)} €</div> 
            <img src={image.main_attachment.big} alt={image.title} />
            <div className="image-info">
                <h3>{image.title}</h3>
                <p>{image.author.name}</p>
            </div>
            <div className="like-section">
                <FaThumbsUp
                    className="like-icon"
                    onClick={() => onLikeToggle(image.id)}
                    style={{ color: image.liked ? '#02ee8c' : '#ff0000' }}
                />
                <span>{image.likes_count}</span> 
            </div>
        </div>
    );
};

export default ImageItem;
 */

import React from 'react';
import { FaThumbsUp, FaRedoAlt } from 'react-icons/fa'; // Importar íconos adicionales

interface ImageItemProps {
    image: {
        id: number;
        title: string;
        main_attachment: { big: string; small: string };
        liked: boolean;
        likes_count: number;
        reload_count: number; // Agregar reload_count
        author:  string ;
        price: number; // Añadir precio
    };
    onLikeToggle: (id: number) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, onLikeToggle }) => {
    return (
        <div className="image-item">
            <div className="price-tag">{image.price.toFixed(2)} €</div> {/* Mostrar el precio */}
            <img src={image.main_attachment.big} alt={image.title} />
            <div className="image-info">
                <h3>{image.title}</h3>
                <p>{image.author}</p> {/* Mostrar el autor */}
            </div>
            <div className="icon-section">
                <div className="like-section">
                    <FaThumbsUp
                        className="like-icon"
                        onClick={() => onLikeToggle(image.id)}
                        style={{ color: image.liked ? '#02ee8c' : '#ff0000' }} // Cambia el color según si está 'liked' o no
                    />
                    <span>{image.likes_count}</span> {/* Mostrar la cantidad de likes */}
                </div>
                <div className="reload-section">
                    <FaRedoAlt className="reload-icon" />
                    <span>{image.reload_count}</span> {/* Mostrar la cantidad de reloads */}
                </div>
            </div>
        </div>
    );
};

export default ImageItem;
