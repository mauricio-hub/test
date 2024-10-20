import { useEffect, useState } from 'react';

interface Image {
    id: string;
    url: string;
    liked: boolean;
}

type FetchImages = (query: string, page: number) => Promise<void>;

const useImages = (searchQuery: string, page: number) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchImages: FetchImages = async (query, page) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3100/images?search=${query}&page=${page}`);
            if (!response.ok) throw new Error('Error fetching images');
            const data: Image[] = await response.json();
            setImages((prev) => [...prev, ...data]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error desconocido');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(searchQuery, page);
    }, [searchQuery, page]);

    return { images, loading, error, fetchImages,setImages };
};

export default useImages;
