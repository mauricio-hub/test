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
        // Posición actual del scroll
      const scrollY = window.scrollY;
       // Altura de la ventana
      const windowHeight = window.innerHeight; 
       // Altura total del documento
      const documentHeight = document.documentElement.scrollHeight; 

      // Si el usuario ha llegado al final de la página y no está cargando imágenes
      if (scrollY + windowHeight >= documentHeight - 100 && !loading) {
        // Incrementa la página y carga más imágenes
        setPage((prevPage) => prevPage + 1);  
        // Carga más imágenes para la nueva página
        fetchImages(page + 1);  
      }
    };

    window.addEventListener('scroll', handleScroll);  // Añadir el evento de scroll
    return () => window.removeEventListener('scroll', handleScroll);  // Limpiar el evento al desmontar
  }, [loading, page, fetchImages, setPage]);
};
