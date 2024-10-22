import { useEffect, useState } from 'react';
import ImageList from '../components/ImageList';
import useImages from '../hooks/useImages';
import { Header } from '../components/Header';
import Spinner from '../components/Spinner';

export const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const { images, loading, error, fetchImages, setImages } = useImages(page);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
         // Reiniciar la página a 1 en cada búsqueda
        setPage(1);
    };

    const handleLikeToggle = async (id: number) => {
        try {
            await fetch(`http://localhost:3100/images/${id}/likes`, {
                method: 'POST',
            });
    
    
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
                // Incrementar la página
                setPage((prevPage) => prevPage + 1); 
                // Simulación de carga de nuevas imágenes
                fetchImages(page + 1); 
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, page]);

    const filteredImages = images.filter((image) => {
        const lowerQuery = searchQuery.toLowerCase();
        return (
            image.title.toLowerCase().includes(lowerQuery) ||
            image.author.toLowerCase().includes(lowerQuery) ||
            image.price.toString().includes(lowerQuery)
        );
    });

    return (
        <div className='container'>
            <Header handleSearch={handleSearch} />
            <ImageList images={filteredImages} onLikeToggle={handleLikeToggle} />
            {loading && <Spinner/>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};
