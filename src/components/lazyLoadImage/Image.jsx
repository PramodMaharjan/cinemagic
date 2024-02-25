import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Image = ({ src, alt, className }) => {
    return (
        <div>
            <LazyLoadImage
                className={className || ''}
                alt={alt}
                src={src}
                effect='blur'
            />
        </div>
    )
}

export default Image
