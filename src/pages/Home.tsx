// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import ImageList from '../components/ImageList';
import useImages from '../hooks/useImages';
import { SearchBar } from '../components/SearchBar';


export const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const { images, loading, error, fetchImages } = useImages(searchQuery, page);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setPage(1); // Reiniciar la página a 1 en cada búsqueda
        fetchImages(query, 1); // Fetch inicial
    };

    const handleLikeToggle = async (id: number) => {
        // Lógica para enviar el like al servidor
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
      console.log('searchQuery',searchQuery, 'page',page);

    }, [searchQuery, page]);
    

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {error && <p>Error: {error}</p>}
            {loading ? <p>Cargando...</p> : (
                <ImageList images={images}/>
            )}
        </div>
    );
};
