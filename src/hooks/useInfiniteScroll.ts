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
      const scrollY = window.scrollY;  // Posición actual del scroll
      const windowHeight = window.innerHeight;  // Altura de la ventana
      const documentHeight = document.documentElement.scrollHeight;  // Altura total del documento

      // Si el usuario ha llegado al final de la página y no está cargando imágenes
      if (scrollY + windowHeight >= documentHeight - 100 && !loading) {
        setPage((prevPage) => prevPage + 1);  // Incrementa la página
        fetchImages(page + 1);  // Carga más imágenes para la nueva página
      }
    };

    window.addEventListener('scroll', handleScroll);  // Añadir el evento de scroll
    return () => window.removeEventListener('scroll', handleScroll);  // Limpiar el evento al desmontar
  }, [loading, page, fetchImages, setPage]);
};
