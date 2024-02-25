import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './style.scss';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { useFetch } from '../../../hooks/useFetch.jsx';
import Image from '../../../components/lazyLoadImage/Image.jsx';
import Genres from '../../../components/genres/Genres.jsx';
import Rating from '../../../components/rating/Rating.jsx';
import FormatDate from '../../../components/formatDate/FormatDate.jsx';
import PlayVideo from '../../../components/playVideo/PlayVideo.jsx';

const DetailBanner = ({ crew, video }) => {
    const [showVideoPopup, setShowVideoPopup] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { backdrop } = useSelector((state) => state.url)
    const imageUrl = backdrop + data?.poster_path
    const genresId = data?.genres?.map(item => item.id)
    const director = crew?.filter(item => item.job === 'Director')
    const writer = crew?.filter(item => item.job === 'Screenplay' || item.job === 'Story' || item.job === 'Writer')
    let yearOnly = true

    const minutesToHour = (totalMinutes) => {
        const hour = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hour}h ${minutes > 0 ? `${minutes}m` : ''}`
    }

    const skeleton = () => (
        <ContentWrapper>
            <div className='detailsLeft skeleton'></div>
            <div className='detailsRight'>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
                <div className='row skeleton'></div>
            </div>
        </ContentWrapper>
    )

    return (
        <div className='detailsBanner'>
            <div className='backdropImage'>
                <Image
                    src={imageUrl}
                    alt='Background Image'
                />
            </div>
            <div className='opacity-layer'></div>
            {!loading ? (
                <ContentWrapper>
                    <div className='content'>
                        <div className='detailsLeft'>
                            <Image
                                className='poster'
                                src={data?.poster_path ? imageUrl : ''}
                                alt='Poster'
                            />
                        </div>
                        <div className='detailsRight'>
                            <div className='title'>{data?.title || data?.name} ({FormatDate(data?.release_date || data?.first_air_date, yearOnly)})</div>
                            <div className='subtitle'>{data?.tagline}</div>
                            <Genres data={genresId} />
                            <div className='row'>
                                <Rating data={data} />
                                {video && (
                                    <div className='playIcon'>
                                        <span
                                            className='text'
                                            onClick={() => {
                                                setShowVideoPopup(true)
                                                setVideoId(video?.key)
                                            }}
                                        >
                                            Watch Trailer
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='overview'>
                                <div className='heading'>Overview</div>
                                <div className='description'>{data?.overview}</div>
                            </div>
                            <div className='infoItems'>
                                {data?.status && (
                                    <div className='infoItem'>
                                        <span className='text bold'>Status:</span>
                                        <span className='text'>{data?.status}</span>
                                    </div>
                                )}
                                {data?.release_date && (
                                    <div className='infoItem'>
                                        <span className='text bold'>Release Date:</span>
                                        <span className='text'>{FormatDate(data?.release_date || data?.first_air_date, yearOnly = false)}</span>
                                    </div>
                                )}
                                {data?.runtime && (
                                    <div className='infoItem'>
                                        <span className='text bold'>Runtime:</span>
                                        <span className='text'>{minutesToHour(data?.runtime)}</span>
                                    </div>
                                )}
                            </div>
                            {director?.length > 0 && (
                                <div className='infoItems'>
                                    <span className='text bold'>Director:  </span>
                                    <span className='text'>{director?.map((item, index) => (
                                        <span key={index}>
                                            {item.name}
                                            {director.length - 1 !== index && ', '}
                                        </span>
                                    ))}
                                    </span>
                                </div>
                            )}
                            {writer?.length > 0 && (
                                <div className='infoItems'>
                                    <span className='text bold'>Writer:  </span>
                                    <span className='text'>{writer?.map((item, index) => (
                                        <span key={index}>
                                            {item.name}
                                            {writer.length - 1 !== index && ', '}
                                        </span>
                                    ))}
                                    </span>
                                </div>
                            )}
                            {data?.created_by?.length > 0 && (
                                <div className='infoItems'>
                                    <span className='text bold'>Creator:  </span>
                                    <span className='text'>{data?.created_by?.map((item, index) => (
                                        <span key={index}>
                                            {item.name}
                                            {data?.created_by?.length - 1 !== index && ', '}
                                        </span>
                                    ))}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <PlayVideo
                        showVideoPopup={showVideoPopup}
                        videoId={videoId}
                        setShowVideoPopup={setShowVideoPopup}
                        setVideoId={setVideoId}
                    />
                </ContentWrapper>

            ) :
                <div className='loadingSkeleton'>
                    {skeleton()}
                </div>
            }
        </div>
    );
};

export default DetailBanner;
