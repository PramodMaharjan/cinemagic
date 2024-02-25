import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { useFetch } from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Image from '../../../components/lazyLoadImage/Image';
import { ImSearch } from 'react-icons/im';

const HeroBanner = () => {
  const [background, setBackground] = useState('')
  const [query, setQuery] = useState('')
  const { url } = useSelector(state => state)
  const { data, loading } = useFetch('/movie/upcoming')
  const navigate = useNavigate()

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg)
  }, [data])

  const handleSearchQuery = (event) => {
    if (event.key === 'Enter' && query.length !== 0) {
      navigate(`/search/${query}`)
    }
  }

  const handleClick = () => {
    if (query.length !== 0) {
      navigate(`/search/${query}`)
    }
  }

  return (
    <div className='heroBanner'>
      {!loading && (
        <div className='backdrop-img'>
          <Image
            src={background}
            alt='Hero Image'
          />
        </div>
      )}
      <div className='opacity-layer'></div>
      <ContentWrapper>
        <div className='heroBannerContent'>
          <span className='title'>Cinemagic</span>
          <span className='subTitle'>Your exclusive access to cinematic masterpieces.</span>
          <div className='searchInput'>
            <input
              type='text'
              placeholder='Find movies, TV shows, and more.'
              onChange={(event) => setQuery(event.target.value)}
              onKeyUp={handleSearchQuery}
            />
            <button onClick={handleClick}>
              <ImSearch size={25} />
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
