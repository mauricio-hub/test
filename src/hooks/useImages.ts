import { useState, useEffect } from 'react';
import { fetchImages as fetchImagesService } from '../services/imageService';

/**
 * Hook que maneja la lógica de obtener imágenes desde la API.
 * 
 * @param {number} page - Número de página para la paginación.
 * @returns {object} - Un objeto que contiene las imágenes, estado de carga y errores.
 */
const useImages = (page: number) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async (page: number) => {
    setLoading(true);
    try {
       setTimeout(async () => {
         // Llamada a la API desde services
        const data = await fetchImagesService(page); 
         // Paginación
        setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data])); 
        setLoading(false);
        
      }, 1000);  
      //usar cuando esta en testing
    /*   const data = await fetchImagesService(page); 
      setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data])); 
      setLoading(false); */
    } catch (err) {
      
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  return { images, loading, error, setImages, fetchImages };
};

export default useImages;
