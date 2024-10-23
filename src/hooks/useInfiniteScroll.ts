import { useEffect } from 'react';

/**
 * Hook que maneja el scroll infinito. Escucha el evento de scroll y, 
 * cuando el usuario llega al final de la página, incrementa el valor de `page`
 * y ejecuta la función `fetchImages` para cargar más imágenes.
 * 
 * @param {boolean} loading - Indica si las imágenes están cargando.
 * @param {(page: number) => void} fetchImages - Función para obtener las imágenes de la API.
 * @param {number} page - Página actual.
 * @param {React.Dispatch<React.SetStateAction<number>>} setPage - Función para actualizar el número de página.
 */
export const useInfiniteScroll = (
  loading: boolean,
  fetchImages: (page: number) => void,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>
) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Si el usuario ha llegado al final de la página y no está cargando imágenes
      if (scrollY + windowHeight >= documentHeight - 100 && !loading) {
        // Incrementa la página y carga más imágenes
        setPage((prevPage) => prevPage + 1);
        fetchImages(page + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, page, fetchImages, setPage]);
};
