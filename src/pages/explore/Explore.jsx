import { useEffect, useState } from 'react';
import fetchDataFromApi from '../../utils/api';
import { useParams } from 'react-router-dom';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.scss';
import MovieData from '../../components/movieData/MovieData';
import Select from 'react-select';
import { FadeLoader } from 'react-spinners';
import { useFetch } from '../../hooks/useFetch';

let params = {
    with_genres: '',
    sort_by: ''
}

const sortbyData = [
    { value: 'popularity.desc', label: 'Popularity Descending' },
    { value: 'popularity.asc', label: 'Popularity Ascending' },
    { value: 'vote_average.desc', label: 'Rating Descending' },
    { value: 'vote_average.asc', label: 'Rating Ascending' },
    {
        value: 'primary_release_date.desc',
        label: 'Release Date Descending',
    },
    { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
    { value: 'original_title.asc', label: 'Title (A-Z)' },
];

const Explore = () => {

    const { mediaType } = useParams()
    const { data: genresData } = useFetch(`/genre/${mediaType}/list`);
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [genres, setGenres] = useState(null)
    const [sortBy, setSortBy] = useState(null)

    const fetchData = () => {
        setLoading(true)
        fetchDataFromApi(`/discover/${mediaType}`, params).then(response => {
            setData(response)
            setPage(prevState => prevState + 1)
            setLoading(false)
        })
    }

    const fetchMoreData = () => {
        fetchDataFromApi(`/discover/${mediaType}`, params).then(response => {
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

    const handleChange = (selectedItems, action) => {
        if (action.name === 'genres') {
            setGenres(selectedItems)
            if (action.action !== 'clear') {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                params.with_genres = genreId
            } else {
                delete params.with_genres
            }
        }
        if (action.name === 'sort') {
            setSortBy(selectedItems)
            if (action.action !== 'clear') {
                params.sort_by = selectedItems.value
            } else {
                delete params.sort_by
            }
        }

        setPage(1)
        fetchData()
    }

    useEffect(() => {
        params = {}
        setData(null)
        setPage(1)
        setGenres(null)
        setSortBy(null)
        fetchData()
    }, [mediaType])

    return (
        <div className='explore'>
            <ContentWrapper>
                <div className='exploreHeader'>
                    <div className='title'>
                        {`Explore ${mediaType === 'movie' ? 'Movies' : 'TV Shows'}`}
                    </div>
                    <div className='filters'>
                        <Select
                            isMulti
                            name='genres'
                            value={genres}
                            options={genresData?.genres}
                            getOptionLabel={option => option.name}
                            getOptionValue={option => option.id}
                            closeMenuOnSelect={false}
                            placeholder='Select genres'
                            onChange={handleChange}
                            className="react-select-container genres"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name='sort'
                            value={sortBy}
                            options={sortbyData}
                            placeholder='Sort  By'
                            onChange={handleChange}
                            isClearable={true}
                            className="react-select-container sortBy"
                            classNamePrefix="react-select"
                        />
                    </div>
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
                                mediaType={mediaType}
                            />
                        )
                    })}
                </InfiniteScroll>
            </ContentWrapper>
        </div >
    )
}

export default Explore;