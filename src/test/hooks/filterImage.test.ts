import { filterImages } from "../../hooks/filterImages";



describe('filterImages', () => {
  it('debería filtrar imágenes por título, autor o precio', () => {
    const mockImages = [
      { id: 1, title: 'Sunset', author: 'John Doe', price: 100 },
      { id: 2, title: 'Mountain', author: 'Jane Doe', price: 200 },
      { id: 3, title: 'River', author: 'John Smith', price: 300 }
    ];

    // Filtrar por título
    let result = filterImages(mockImages, 'Sunset');
    expect(result).toEqual([{ id: 1, title: 'Sunset', author: 'John Doe', price: 100 }]);

    // Filtrar por autor
    result = filterImages(mockImages, 'Jane');
    expect(result).toEqual([{ id: 2, title: 'Mountain', author: 'Jane Doe', price: 200 }]);

    // Filtrar por precio
    result = filterImages(mockImages, '300');
    expect(result).toEqual([{ id: 3, title: 'River', author: 'John Smith', price: 300 }]);
  });

  it('debería devolver todas las imágenes si no hay query de búsqueda', () => {
    const mockImages = [
      { id: 1, title: 'Sunset', author: 'John Doe', price: 100 },
      { id: 2, title: 'Mountain', author: 'Jane Doe', price: 200 }
    ];

    const result = filterImages(mockImages, '');
    expect(result).toEqual(mockImages); // Debería devolver todas las imágenes si la query está vacía
  });

  it('debería devolver un array vacío si no hay coincidencias', () => {
    const mockImages = [
      { id: 1, title: 'Sunset', author: 'John Doe', price: 100 },
      { id: 2, title: 'Mountain', author: 'Jane Doe', price: 200 }
    ];

    const result = filterImages(mockImages, 'Ocean');
    expect(result).toEqual([]); // Ninguna imagen coincide con "Ocean"
  });
});
