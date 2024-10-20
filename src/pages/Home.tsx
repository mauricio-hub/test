import  { useEffect, useState } from 'react';
import ImageList from '../components/ImageList';
import useImages from '../hooks/useImages';

import { Header } from '../components/Header';

export const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const { images, loading, error, fetchImages,setImages } = useImages(searchQuery, page);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reiniciar la página a 1 en cada búsqueda
        fetchImages(query, 1); // Fetch inicial
    };

    const handleLikeToggle = async (id: number) => {
        try {
            // Enviar solicitud al servidor para alternar el estado del like
            const response = await fetch(`http://localhost:3100/images/${id}/likes`, {
                method: 'POST',
            });
    
            if (!response.ok) {
                throw new Error('Error al enviar el like');
            }
    
            // Actualizar el estado local de las imágenes con el "like" alternado
            const updatedImages = images.map(image =>
                Number(image.id) === id ? { ...image, liked: !image.liked } : image
            );
    
            setImages(updatedImages);
        } catch (error) {
            console.error('Error al alternar el like:', error);
        }
    };
    
    
    
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            if (scrollY + windowHeight >= documentHeight - 100 && !loading) {
                setPage((prevPage) => prevPage + 1);
                fetchImages(searchQuery, page + 1); // Fetch de la nueva página
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, page, searchQuery]);

    useEffect(() => {
        console.log('searchQuery', searchQuery, 'page', page);
    }, [searchQuery, page]);

    return (
        <>
            <Header handleSearch={handleSearch}/>
            {error && <p>Error: {error}</p>}
            {loading ? <p>Cargando...</p> : (
                <ImageList images={images} onLikeToggle={handleLikeToggle} />
            )}
        </>
    );
};
