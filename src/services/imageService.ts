export const fetchImages = async (page: number) => {
    const response = await fetch(`http://localhost:3100/images?page=${page}`);
    if (!response.ok) {
      throw new Error('Error al obtener imágenes');
    }
    return response.json();  

  
  };
  
  export const toggleLike = async (id: number) => {
    const response = await fetch(`http://localhost:3100/images/${id}/likes`, {
      method: 'POST',
    });
    return response;
  };
  