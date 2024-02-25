
import Carousel from '../../../components/carousel/Carousel';
import { useFetch } from '../../../hooks/useFetch';

const SimilarMovies = ({ mediaType, id }) => {
    const { data, loading } = useFetch(`/${mediaType}/${id}/similar`);
    const title = mediaType === 'tv' ? 'Similar TV Shows' : 'Similar Movies';

    return (
        data?.results.length > 0 && (
            <Carousel
                title={title}
                data={data?.results}
                loading={loading}
                endPoint={mediaType}
            />
        ))
}

export default SimilarMovies
