import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <ul>
        <li><Link to="#">Explore</Link></li>
        <li><Link to="#">Company</Link></li>
        <li><Link to="#">Legal</Link></li>
      </ul>
      <ul className="social">
        {/* Ensure these exist in public/images/ */}
        <li><a href="#"><img src="/images/facebook.png" alt="facebook" /></a></li>
        <li><a href="#"><img src="/images/twitter.png" alt="x" /></a></li>
        <li><a href="#"><img src="/images/instagram.png" alt="instagram" /></a></li>
        <li><a href="#"><img src="/images/linkedin2.png" alt="linkedin" /></a></li>
      </ul>
    </footer>
  );
};

export default Footer;