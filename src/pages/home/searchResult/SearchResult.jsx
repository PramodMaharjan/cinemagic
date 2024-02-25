import { useEffect, useState } from 'react';
import fetchDataFromApi from '../../../utils/api';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';
import MovieData from '../../../components/movieData/MovieData';
import { FadeLoader } from 'react-spinners'

const SearchResult = () => {

  const { query } = useParams()
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const params = {
    query: query, page: page
  }

  const searchApi = () => {
    setLoading(true)
    fetchDataFromApi('/search/multi', params).then(response => {
      setData(response)
      setPage(prevState => prevState + 1)
      setLoading(false)
    })
  }

  const fetchMoreData = () => {
    fetchDataFromApi('/search/multi', params).then(response => {
      if (data?.results) {
        setData({
          ...data,
          results: [...data.results, ...response.results]
        })
      } else {
        setData(response)
      }
      setPage(prevState => prevState + 1)
    })

  }

  useEffect(() => {
    searchApi()
  }, [query])

  return (
    <div className='searchResults'>
      <ContentWrapper>
        <div className='searchTitle'>
          {`Search ${data?.total_results > 1 ? 'results' : 'result'} of '${query}'`}
        </div>
        <InfiniteScroll
          dataLength={data?.results?.length || []}
          loader={
            <div className='spinner'>
              <FadeLoader color='white' />
            </div>
          }
          className='content'
          next={fetchMoreData}
          hasMore={page <= data?.total_pages}

        >
          {data?.results?.map((item, index) => {
            return (
              <MovieData
                key={index}
                data={item}
                loading={loading}
                fromSearch
              />
            )
          })}
        </InfiniteScroll>
      </ContentWrapper>
    </div >
  )
}

export default SearchResult;
