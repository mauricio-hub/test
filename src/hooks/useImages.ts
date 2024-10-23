import { useState, useEffect } from 'react';
import { fetchImages as fetchImagesService } from '../services/imageService';

/**
 * Tipo que representa la estructura de cada imagen.
 */
type Image = {
  type: string;
  id: number;
  title: string;
  author: string;
  created_at: string;
  main_attachment: {
    big: string;
    small: string;
  };
  likes_count: number;
  liked: boolean;
  links: {
    rel: string;
    uri: string;
    methods: string;
  }[];
};

/**
 * Hook que maneja la lógica de obtener imágenes desde la API y simular la carga infinita.
 * 
 * @param {number} page - Número de página para la paginación.
 * @returns {object} - Un objeto que contiene las imágenes, estado de carga, errores y función de obtención de imágenes.
 */
const useImages = (page: number) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);

    try {
      let data: Image[] = [];
      if (page === 1) {
        // Primera carga desde la API
        data = await fetchImagesService(page);
        setImages(data);
      } else {
        // Añadir las mismas imágenes para simular el scroll infinito
        setImages((prevImages) => [...prevImages, ...prevImages]);
      }
    } catch (err) {
      setError('Error al obtener las imágenes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  return { images, loading, error, setImages, fetchImages };
};

export default useImages;
