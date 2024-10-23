import { renderHook, act } from '@testing-library/react';
import useImages from '../../hooks/useImages';
import { fetchImages } from '../../services/imageService';

// Hacemos un mock completo del servicio de imágenes
jest.mock('../../services/imageService');

describe('useImages hook', () => {
  it('debería inicializarse y comenzar la carga correctamente', () => {
    const { result } = renderHook(() => useImages(1));

    // Verificamos que loading está en true al iniciar
    expect(result.current.loading).toBe(true);
    expect(result.current.images).toEqual([]);
    expect(result.current.error).toBe(null);
  });

  it('debería cargar imágenes correctamente', async () => {
    const fakeImages = [{ id: 1, title: 'Image 1' }, { id: 2, title: 'Image 2' }];

    // Hacemos el mock para que fetchImages devuelva los datos simulados
    (fetchImages as jest.Mock).mockResolvedValueOnce(fakeImages);

    const { result } = renderHook(() => useImages(1));

    // Aquí es donde usamos 'act()' para manejar las actualizaciones asíncronas de estado
    await act(async () => {
      await result.current.fetchImages(1);
    });

    // Verificamos que las imágenes fueron cargadas correctamente
    expect(result.current.images).toEqual(fakeImages);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});
