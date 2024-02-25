import ReactPlayer from 'react-player/youtube';
import { IoClose } from 'react-icons/io5';
import './style.scss';

const PlayVideo = ({ showVideoPopup, setShowVideoPopup, videoId, setVideoId }) => {
    const hideVideoPlayer = () => {
        setShowVideoPopup(false)
        setVideoId(null)
    }
    return (
        <>
            <div className={`videoPopup ${showVideoPopup ? 'visible' : ''}`}>
                <div className='opacityLayer' onClick={hideVideoPlayer}></div>
                <div className='videoPlayer'>
                    <span className='close' onClick={hideVideoPlayer}>
                        <IoClose />
                    </span>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                        controls
                        width='100%'
                        height='100%'
                        playing
                    />
                </div>
            </div>
        </>
    )
}

export default PlayVideo
