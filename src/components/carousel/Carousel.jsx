import { useSelector } from 'react-redux';
import Image from '../lazyLoadImage/Image';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Genres from '../genres/Genres';
import './style.scss';
import Rating from '../rating/Rating';
import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FormatDate from '../formatDate/FormatDate';
import NoPoster from '../../assets/no-poster.png';

const Carousel = ({ data, loading, endPoint, title }) => {
    const { backdrop } = useSelector(state => state.url)
    const carouselRef = useRef()
    const navigate = useNavigate()

    const moveCarousel = dir => {
        const current = carouselRef.current
        const scrollAmount = dir === 'left' ?
            current.scrollLeft - (current.offsetWidth + 20) :
            current.scrollLeft + (current.offsetWidth + 20)
        current.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })

    }

    const skItem = () => {
        return (
            <div className='skeletonItem'>
                <div className='carouselPoster skeleton'></div>
                <div className='carouselText'>
                    <div className='title skeleton'></div>
                    <div className='date skeleton'></div>
                </div>
            </div>
        )
    }

    return (
        <div className='carouselContent'>
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <FaArrowCircleLeft className='moveLeft arrow' onClick={() => moveCarousel('left')} />
                <FaArrowCircleRight className='moveRight arrow' onClick={() => moveCarousel('right')} />
                {!loading ? (
                    <div className='carouselItems' ref={carouselRef}>
                        {data?.map((item) => {
                            const imgURL = item.poster_path ? backdrop + item.poster_path : NoPoster
                            return (
                                <div
                                    key={item.id}
                                    className='carouselItem'
                                    onClick={() => navigate(`/${item.media_type || endPoint}/${item.id}`)}
                                >
                                    <div className='carouselPoster'>
                                        <Image
                                            src={imgURL}
                                            alt='Carousel Image'
                                        />
                                        <Rating data={item} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
                                    </div>
                                    <div className='carouselText'>
                                        <span className='title'>{item.title || item.name}</span>
                                        <span className='date'>{FormatDate(item.release_date || item.first_air_date)}</span>
                                    </div>

                                </div>
                            )
                        })}
                    </div>) : (
                    <div className='loadingSkeleton'>
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    )
}

export default Carousel
