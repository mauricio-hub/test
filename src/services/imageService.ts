const isProduction = process.env.NODE_ENV === 'production';


export const fetchImages = async (page: number) => {
  let response;

  if (isProduction) {
    // En producción, usa el archivo JSON estático
    console.log('estoy en produccion....',isProduction);
    response = await fetch(`/data.json`);
    console.log('response images....',response);
  } else {
    console.log('estoy en desarrollo');
    // En desarrollo, usa la API mock
    response = await fetch(`http://localhost:3100/images?page=${page}`);
  }

  if (!response.ok) {
    throw new Error('Error al obtener imágenes');
  }
  return response.json();
};

export const toggleLike = async (id: number) => {
  if (isProduction) {
    // En producción, no hay API para manejar likes, por lo que simularemos la respuesta
    console.warn(`Simulando el toggle de like para la imagen con ID ${id} en producción.`);
    return { status: 204 }; // Simular un status de éxito
  } else {
     console.log('like estoy en desarrollo ');
    // En desarrollo, usa la API mock
    const response = await fetch(`http://localhost:3100/images/${id}/likes`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Error al realizar el like');
    }
    return response;
  }
};
