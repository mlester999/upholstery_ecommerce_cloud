import { LazyLoadImage } from 'react-lazy-load-image-component';
import Icon from '../assets/logo.jpg';
import IconSD from '../assets/logo_sd.jpg';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Logo = () => {
  return (
    <LazyLoadImage
      src={Icon}
      PlaceholderSrc={IconSD}
      width={100}
      alt='CCLDO Logo'
      effect='blur'
    />
  );
};

export default Logo;
