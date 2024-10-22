import { useState, useEffect } from 'react';

const useImages = (page: number) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulación de fetch de datos
  const fetchImages = async (page: number) => {
    setLoading(true);
    try {
      // Simular un retraso para "cargar" más imágenes
      setTimeout(async () => {
        const response = await fetch(`http://localhost:3100/images?page=${page}`);
        const data = await response.json();

        setImages((prevImages) => (page === 1 ? data : [...prevImages, ...data])); // Paginación
        setLoading(false);
      }, 1000); // Simulamos un retraso de 1 segundo para la carga
    } catch (err) {
      setError('Error fetching images');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page); // Fetch inicial o por página
  }, [page]);

  return { images, loading, error, fetchImages, setImages };
};

export default useImages;
