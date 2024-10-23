import { useState } from 'react';
import ImageList from '../components/ImageList';
import useImages from '../hooks/useImages';
import { Header } from '../components/Header';
import Spinner from '../components/Spinner';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useLikeToggle } from '../hooks/useLikeToggle';
import { filterImages } from '../hooks/filterImages';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  // Ahora `fetchImages` está disponible para usarlo en `useInfiniteScroll`
  const { images, loading, error, setImages, fetchImages } = useImages(page);

  // Lógica de scroll infinito
  useInfiniteScroll(loading, fetchImages, page, setPage);

  // Lógica de like/unlike
  const handleLikeToggle = useLikeToggle(images, setImages);

  // Filtrar imágenes
  const filteredImages = filterImages(images, searchQuery);

  return (
    <div className="container">
      <Header handleSearch={setSearchQuery} />
      <ImageList images={filteredImages} onLikeToggle={handleLikeToggle} />
      {loading && <Spinner />}
      {error && <p>Error: {error}</p>}
    </div>
  );
};
