import { FaSquareFacebook } from 'react-icons/fa6';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import './style.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';


const Footer = () => {
  return (
    <div className='footer'>
      <ContentWrapper>
        <ul className='mainItems'>
          <li className='mainItem'>Copyright © 2024 Cinemagic</li>
          <li className='mainItem'>Privacy & Legal</li>
          <li className='mainItem'>About</li>
          <li className='mainItem'>Blog</li>
          <li className='mainItem'>FAQ</li>
        </ul>
        <div className='footer-icons'>
          <span className='footer-icon'><FaSquareFacebook /></span>
          <span className='footer-icon'><FaInstagramSquare /></span>
          <span className='footer-icon'><FaSquareXTwitter /></span>
          <span className='footer-icon'><FaLinkedin /></span>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Footer
