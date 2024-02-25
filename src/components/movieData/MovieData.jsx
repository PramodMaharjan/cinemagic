import { useSelector } from 'react-redux';
import Image from '../lazyLoadImage/Image';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import FormatDate from '../formatDate/FormatDate';
import NoPoster from '../../assets/no-poster.png';
import Rating from '../rating/Rating';
import Genres from '../genres/Genres';

const MovieData = ({ data, mediaType, fromSearch }) => {
    const { backdrop } = useSelector(state => state.url)
    const navigate = useNavigate()
    const imgURL = data.poster_path ? backdrop + data.poster_path : NoPoster

    return (
        <div
            key={data.id}
            className='searchedItem'
            onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}
        >
            <div className='poster'>
                <Image
                    src={imgURL}
                    alt='Poster'
                />
                {!fromSearch && (
                    <>
                        <Rating data={data} />
                        <Genres data={data?.genre_ids?.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className='textContent'>
                <span className='title'>{data.title || data.name}</span>
                <span className='date'>{FormatDate(data.release_date || data.first_air_date)}</span>
            </div>
        </div>
    )
}

export default MovieData
