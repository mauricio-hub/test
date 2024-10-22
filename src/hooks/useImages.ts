import { useState, useEffect } from 'react';

const useImages = (searchQuery: string, page: number) => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchImages = async (query: string, page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3100/images?page=${page}`);
      const data = await response.json();

      const filteredData = data.filter((image: any) => {
        const lowerQuery = query.toLowerCase();
        return (
          image.title.toLowerCase().includes(lowerQuery) ||
          image.author.toLowerCase().includes(lowerQuery) ||
          image.price.toString().includes(lowerQuery)
        );
      });

      setImages((prevImages) => (page === 1 ? filteredData : [...prevImages, ...filteredData]));
      setLoading(false);
    } catch (err) {
      setError('Error fetching images');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(searchQuery, page);
  }, [searchQuery, page]);

  return { images, loading, error, fetchImages, setImages };
};

export default useImages;
