import { data } from '../data'; // Ajusta la ruta según donde esté ubicado el archivo

const isProduction = process.env.NODE_ENV === 'production';

export const fetchImages = async (page: number) => {
  if (isProduction) {
    // En producción, usa el archivo estático importado desde data.ts
    console.log('Estoy en producción....', isProduction);
    console.log('actulizado el archivo  ****');
    return data; // Retorna directamente los datos desde el archivo
  } else {
    console.log('Estoy en desarrollo');
    // En desarrollo, usa la API mock
    const response = await fetch(`http://localhost:3100/images?page=${page}`);

    if (!response.ok) {
      throw new Error('Error al obtener imágenes');
    }
    return response.json();
  }
};

export const toggleLike = async (id: number) => {
  if (isProduction) {
    // En producción, simulamos el toggle de like
    console.warn(`Simulando el toggle de like para la imagen con ID ${id} en producción.`);
    return { status: 204 }; // Simulamos un status de éxito
  } else {
    console.log('Like en desarrollo');
    // En desarrollo, usamos la API mock
    const response = await fetch(`http://localhost:3100/images/${id}/likes`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Error al realizar el like');
    }
    return response;
  }
};
