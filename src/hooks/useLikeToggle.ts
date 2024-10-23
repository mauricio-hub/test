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
      if (process.env.NODE_ENV === 'production') {
        // En producción simulamos el like
        console.warn(`Simulando el toggle de like para la imagen con ID ${id} en producción.`);
      } else {
        console.log('like estoy en desarrollo : ....)');
        // En desarrollo hacemos la llamada real a la API mock
        await toggleLike(id);
      }

      // Actualizar el estado de las imágenes para reflejar el nuevo estado de "liked"
      const updatedImages = images.map(image =>
        Number(image.id) === id ? { ...image, liked: !image.liked, likes_count: image.liked ? image.likes_count - 1 : image.likes_count + 1 } : image
      );

      setImages(updatedImages);
    } catch (error) {
      console.error('Error al alternar el like:', error);
    }
  };

  return handleLikeToggle;
};
