import { isTouchScreenDevice } from '../functions/isTouchScreenDevice';
import { useState } from 'react';
import { Modal, Container, Row, Col, Badge, Nav } from 'react-bootstrap';
import CardComponent from './Card';

function DotComponent({ data, animation, updateScore, addDiscoverAnimation }) {
  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setTimeout(() => {
      setModalShow(true);
    }, 700);
  }

  function discoverElement(e) {
    e.preventDefault();

    const animatorDiv = e.target.closest(`.${animation}`);
    if (animatorDiv) {
      animatorDiv.classList.remove(`${animation}`);
      animatorDiv.classList.add(`${animation}-on`);

      if (isTouchScreenDevice()) {
        animatorDiv.classList.add('expand-discover-touch');

        setTimeout(() => {
          animatorDiv.classList.remove('expand-discover-touch');
        }, 400);
      }

      openModal();
    }

    if (e.target.classList.contains('dot-hidden')) {
      e.target.classList.remove('dot-hidden');
      addDiscoverAnimation(true);
      updateScore();
    }

    if (e.target.parentNode) {
      if (e.target.parentNode.classList.contains('dot-hidden')) {
        e.target.parentNode.classList.remove('dot-hidden');
        addDiscoverAnimation(true);
        updateScore();
      } else if (e.target.parentNode.parentNode) {
        if (e.target.parentNode.parentNode.classList.contains('dot-hidden')) {
          e.target.parentNode.parentNode.classList.remove('dot-hidden');
          addDiscoverAnimation(true);
          updateScore();
        }
      }
    }
  }

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {data.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='information-image-wrapper'>
            <div className='information'>
              <div className='description'>
                <h6>Technologies:</h6>
                <div className='learnings'>
                  {data.learnings.map((learning) => {
                    return (
                      <Badge
                        pill
                        bg='custom-purple'
                        className='technology-pill'
                        key={learning}>
                        {learning}
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div className='date-description-wrapper'>
                <div className='description'>
                  <h6>Built in:</h6>
                  <p>{data.date}</p>
                </div>
                <div className='description'>
                  <h6>Description:</h6>
                  <p>{data.description}</p>
                </div>
              </div>
            </div>
            <div className='project-image'>
              <img className='image' src={data.image} alt={data.name}></img>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='footer-links'>
            {data.repo.map((repo) => {
              return (
                <a
                  className='footer-link'
                  key={repo}
                  href={repo}
                  target='_blank'
                  rel='noreferrer'>
                  Repo
                </a>
              );
            })}
            <a
              className='footer-link'
              key={data.url}
              href={data.url}
              target='_blank'
              rel='noreferrer'>
              Web
            </a>
          </div>
        </Modal.Footer>
      </Modal>
      <div className={animation}>
        <div onClick={discoverElement} className='dot dot-hidden'>
          <div onClick={openModal} className='large-dot'>
            <div onClick={openModal} className='small-dot'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
