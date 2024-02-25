import { useEffect } from 'react'
import fetchDataFromApi from './utils/api'
import { useDispatch } from 'react-redux';
import { getApiConfigurations, getGenres } from './features/homeSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import SearchResult from './pages/home/searchResult/SearchResult';
import Detail from './pages/detail/Detail';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Explore from './pages/explore/Explore';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    apiData()
    genres()
  }, [])

  const apiData = () => {
    fetchDataFromApi('/configuration').then(response => {
      const url = {
        backdrop: `${response.images.secure_base_url}original`,
        // poster: `${response.images.secure_base_url}original`,
        // profile: `${response.images.secure_base_url}original`,
      }
      dispatch(getApiConfigurations(url))
    })
  }

  const genres = async () => {
    let promises = []
    const endPoints = ['tv', 'movie']
    const allGenres = {}
    endPoints.forEach((item) => {
      promises.push(fetchDataFromApi(`/genre/${item}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map(item => allGenres[item.id] = item)
    })
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Detail />} />
        <Route path='/search/:query' element={<SearchResult />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
      </Routes>
      <Footer />
    </BrowserRouter >
  )
}

export default App
