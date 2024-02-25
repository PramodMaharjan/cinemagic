import { useSelector } from 'react-redux';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Image from '../../../components/lazyLoadImage/Image';
import avatar from '../../../assets/avatar.png';
import './style.scss';
const Cast = ({ data, loading }) => {

    const { backdrop } = useSelector(state => state.url)
    const skeleton = () => {
        return (
            <div className='skItems'>
                <div className='circle skeleton'></div>
                <div className='firstRow skeleton'></div>
                <div className='secondRow skeleton'></div>
            </div>
        )
    }

    return (
        <div className='castSection'>
            <ContentWrapper>
                <div className='title'>Top Cast</div>
                {!loading ? (
                    <div className='castItems'>
                        {data?.map((item) => {
                            const imageUrl = item.profile_path ? backdrop + item.profile_path : avatar
                            return (
                                <div className='castItem' key={item.id}>
                                    <div className='castProfile'>
                                        <Image
                                            src={imageUrl}
                                            alt='Cast'
                                        />
                                    </div>
                                    <div className='castName'>{item.name}</div>
                                    <div className='castCharacter'>{item.character}</div>
                                </div>
                            )
                        })}
                    </div>) :
                    (
                        <div className='loadingSkeleton'>
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                            {skeleton()}
                        </div>
                    )}
            </ContentWrapper>
        </div>
    )
}

export default Cast
