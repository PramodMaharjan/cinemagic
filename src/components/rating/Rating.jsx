
import './style.scss';
const Rating = ({ data }) => {
    return (
        <div className='rating'>
            {(data?.vote_average)?.toFixed(1)}
        </div>
    )
}

export default Rating
