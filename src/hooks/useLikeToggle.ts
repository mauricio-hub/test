import { toggleLike } from '../services/imageService';

/**
 * Hook que maneja la acción de "like/unlike" para las imágenes.
 * Envía una petición `POST` a la API y actualiza el estado de las imágenes
 * para reflejar el nuevo estado de "liked".
 * 
 * @param {any[]} images - Array de imágenes actuales.
 * @param {(images: any[]) => void} setImages - Función para actualizar el estado de las imágenes.
 * @returns {(id: number) => void} handleLikeToggle - Función para alternar el estado de "like/unlike".
 */
export const useLikeToggle = (images: any[], setImages: (images: any[]) => void) => {
  const handleLikeToggle = async (id: number) => {
    try {
      // Llamada a la API desde services
      await toggleLike(id);  

      // Actualizar el estado de las imágenes para reflejar el nuevo estado de "liked"
      const updatedImages = images.map(image =>
        Number(image.id) === id ? { ...image, liked: !image.liked } : image
      );

      setImages(updatedImages);
    } catch (error) {
      console.error('Error al alternar el like:', error);
    }
  };

  return handleLikeToggle;
};
