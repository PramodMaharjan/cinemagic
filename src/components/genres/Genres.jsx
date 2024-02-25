import { useSelector } from 'react-redux';
import './style.scss';

const Genres = ({ data }) => {
    const { genres } = useSelector(state => state)
    return (
        <div className='carouselGenres'>
            {data?.map(id => {
                if (!genres[id]?.name) return;
                return (
                    <div className='carouselGenre' key={id}>
                        {genres[id]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres
