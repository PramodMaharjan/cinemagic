import { useState } from 'react';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import PlayVideo from '../../../components/playVideo/PlayVideo';
import Image from '../../../components/lazyLoadImage/Image';
import { FaRegPlayCircle } from 'react-icons/fa';
import './style.scss';

const VideosSection = ({ data, loading }) => {
    const [showVideoPopup, setShowVideoPopup] = useState(false)
    const [videoId, setVideoId] = useState(null)
    const skeleton = () => {
        return (
            <div className='skItems'>
                <div className='skVideo skeleton'></div>
                <div className='firstRow skeleton'></div>
                <div className='secondRow skeleton'></div>
            </div>
        )
    }
    return (
        <div className='videosSection'>
            <ContentWrapper>
                <div className='title'>Official Videos</div>
                {!loading ? (
                    <div className='videos'>
                        {data?.results?.map(item => {
                            return (
                                <div
                                    className='video'
                                    key={item.id}
                                    onClick={() => {
                                        setShowVideoPopup(true),
                                            setVideoId(item.key)
                                    }}
                                >
                                    <div className='thumbnail'>
                                        <Image
                                            src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                                            alt='Video'
                                        />
                                        <div className='playIcon'>
                                            <FaRegPlayCircle />
                                        </div>
                                    </div>
                                    <div className='videoTitle'>{item.name}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className='loadingSkeleton'>
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper >
            <PlayVideo
                showVideoPopup={showVideoPopup}
                videoId={videoId}
                setShowVideoPopup={setShowVideoPopup}
                setVideoId={setVideoId}
            />
        </div >
    )
}

export default VideosSection
