import { renderHook, act } from '@testing-library/react';
import { useLikeToggle } from '../../hooks/useLikeToggle';
import { toggleLike } from '../../services/imageService';

// Hacemos un mock de toggleLike
jest.mock('../../services/imageService');

describe('useLikeToggle hook', () => {
  it('debería llamar a toggleLike al dar like', async () => {
    // Simulamos que toggleLike devuelve un 204
    (toggleLike as jest.Mock).mockResolvedValueOnce({ status: 204 });

    const mockImages = [{ id: 1, title: 'Image 1', liked: false }];
    const setImages = jest.fn(); // Creamos una función mock para setImages

    // Renderizamos el hook
    const { result } = renderHook(() => useLikeToggle(mockImages, setImages));

    // Ejecutamos el hook para alternar el "like" de la imagen con id 1
    await act(async () => {
     // Llamamos al hook con el id de la imagen
      await result.current(1); 
    });

    // Verificamos que toggleLike fue llamado con el id correcto
    expect(toggleLike).toHaveBeenCalledWith(1);
  });
});
