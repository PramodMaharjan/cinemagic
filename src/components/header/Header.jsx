import './style.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { ImSearch } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoClose } from 'react-icons/io5';

const Header = () => {
  const [show, setShow] = useState('show')
  const [lastScrollY, setLastScrollY] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [showCloseIcon, setShowCloseIcon] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollY)

    return () => window.removeEventListener('scroll', handleScrollY)
  }, [lastScrollY])

  const handleClick = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie')
    } else {
      navigate('/explore/tv')
    }
  }

  const handleScrollY = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !showMobileMenu && !showSearchBar) {
        setShow('hide')
      } else {
        setShow('show')
      }
    } else {
      setShow('show')
    }
    setLastScrollY(window.scrollY)
  }


  const handleSearchQuery = (event) => {
    if (event.key === 'Enter' && searchQuery.length !== 0) {
      navigate(`/search/${searchQuery}`)
      setTimeout(() => {
        setShowSearchBar(false)
        setShowCloseIcon(false)
      }, 1000)
    }
  }

  const handleSearchBar = () => {
    setShowSearchBar(prevState => !prevState)
    setShowCloseIcon(prevState => !prevState)
    setShowMobileMenu(false)
  }

  const handleBurgerIcon = () => {
    setShowMobileMenu(prevState => !prevState)
    setShowSearchBar(false)
    setShowCloseIcon(false)
  }

  return (
    <div className={`header ${showMobileMenu ? 'showMobileItems' : ''} ${show}`}>
      <ContentWrapper>
        <div className='title' onClick={() => navigate('/')}>
          <h2>CINEMAGIC</h2>
        </div>

        <ul className='menuItems'>
          <li className='menuItem' onClick={() => handleClick('movie')}>Movies</li>
          <li className='menuItem' onClick={() => handleClick('tv')}>TV Shows</li>
          <li className='menuItem'>
            {showCloseIcon ? <IoClose onClick={handleSearchBar} /> : <ImSearch onClick={handleSearchBar} />}
          </li>
        </ul>

        <div className='mobileMenu'>
          {showCloseIcon ? <IoClose onClick={handleSearchBar} /> : <ImSearch onClick={handleSearchBar} />}
          <RxHamburgerMenu className='burgerIcon' onClick={handleBurgerIcon} />
        </div>

      </ContentWrapper>
      {showSearchBar &&
        <div className='searchBar'>
          <ContentWrapper>
            <input
              type='text'
              placeholder='Find movies, TV shows, and more.'
              onChange={(event) => setSearchQuery(event.target.value)}
              onKeyUp={handleSearchQuery}
            />
          </ContentWrapper>
        </div>
      }
    </div>
  )
}

export default Header
