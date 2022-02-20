import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'react-bootstrap';

const gitHub = <FontAwesomeIcon icon={faGithub} />;
const linkedIn = <FontAwesomeIcon icon={faLinkedin} />;

function FooterComponent(props) {
  return (
    <div className='footer m-2 m-md-5 mt-0'>
      <p className='mt-5 mb-0'>by Ibrahim Achkar</p>
      <div className='socials'>
        <a
          href='https://github.com/Development-Person/'
          target='_blank'
          className='social p-2 pt-0 pb-0'>
          {gitHub}
        </a>
        <a
          href='https://www.linkedin.com/in/ibrahimak/'
          target='_blank'
          className='social p-2 pt-0 pb-0'>
          {linkedIn}
        </a>
      </div>
    </div>
  );
}

export default FooterComponent;
