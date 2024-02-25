import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { useFetch } from '../../../hooks/useFetch';
import { useState } from 'react';
import Carousel from '../../../components/carousel/Carousel';
import '../style.scss'

const Popular = () => {
    const [endPoint, setEndPoint] = useState('movie')
    const tabData = ['Movies', 'TV Shows']
    const { data, loading } = useFetch(`/${endPoint}/popular`)

    const handleTab = (tab) => {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv')
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Most Popular</span>
                <SwitchTabs data={tabData} handleTab={handleTab} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default Popular
