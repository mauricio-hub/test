/**
 * Función que filtra las imágenes en base a la query de búsqueda. 
 * Realiza una búsqueda sobre el título, autor y precio de cada imagen.
 * 
 * @param {any[]} images - Array de imágenes a filtrar.
 * @param {string} searchQuery - Query de búsqueda introducida por el usuario.
 * @returns {any[]} - Array de imágenes que coinciden con la búsqueda.
 */
export const filterImages = (images: any[], searchQuery: string) => {
    const lowerQuery = searchQuery.toLowerCase();  
    return images.filter((image) => {
      return (
        // Buscar por título  || Buscar por autor || Buscar por precio
        image.title.toLowerCase().includes(lowerQuery) ||  
        image.author.toLowerCase().includes(lowerQuery) || 
        image.price.toString().includes(lowerQuery)  
      );
    });
  };
  