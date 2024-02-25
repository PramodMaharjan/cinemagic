import { useParams } from 'react-router-dom';
import DetailBanner from './detailBanner.jsx/DetailBanner';
import { useFetch } from '../../hooks/useFetch';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import SimilarMovies from './similarMovies/SimilarMovies';
import Recommendations from './recommendations/Recommendations';

const Detail = () => {
  const { mediaType, id } = useParams()
  const { data, loading } = useFetch(`/${mediaType}/${id}/credits`)
  const { data: video, loading: videoLoading } = useFetch(`/${mediaType}/${id}/videos`)

  return (
    <div>
      <DetailBanner
        crew={data?.crew}
        video={video?.results?.[0]}
      />
      <Cast
        data={data?.cast}
        loading={loading}
      />
      {video?.results?.length > 0 &&
        <VideosSection
          data={video}
          loading={videoLoading}
        />
      }
      <SimilarMovies
        mediaType={mediaType}
        id={id}
      />
      <Recommendations
        mediaType={mediaType}
        id={id}
      />
    </div>
  )
}

export default Detail
