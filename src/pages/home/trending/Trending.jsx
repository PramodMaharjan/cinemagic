import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { useFetch } from '../../../hooks/useFetch';
import { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import '../style.scss'

const Trending = () => {
    const [endPoints, setEndPoints] = useState('day')
    const tabData = ['Day', 'Week']
    const { data, loading } = useFetch(`/trending/all/${endPoints}`)

    const handleTab = (tab) => {
        setEndPoints(tab === 'Day' ? 'day' : 'week')
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>
                <SwitchTabs data={tabData} handleTab={handleTab} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending
