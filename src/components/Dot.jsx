import { isTouchScreenDevice } from '../functions/isTouchScreenDevice';
import { useState } from 'react';
import { Modal, Container, Row, Col, Badge, Nav } from 'react-bootstrap';
import CardComponent from './Card';

function DotComponent({ data, animation, updateScore, addDiscoverAnimation }) {
  const [modalShow, setModalShow] = useState(false);

  function openModal() {
    setModalShow(true);
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
          <div className='learnings'>
            {data.learnings.map((learning) => {
              return (
                <div className='pill-wrapper' key={learning} xs={3} md={2}>
                  <Badge pill bg='primary' key={learning}>
                    {learning}
                  </Badge>
                </div>
              );
            })}
          </div>
          <div className='date-description-wrapper'>
            <h6>Built in: {data.date}</h6>
            <div className='description'>
              <h6>Description:</h6>
              <p>{data.description}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='info'>
            {data.repo.map((repo) => {
              return (
                <a
                  className='link-info'
                  key={repo}
                  href={repo}
                  target='_blank'
                  rel='noreferrer'>
                  Repo
                </a>
              );
            })}
            <a
              className='link-info'
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
          <div className='large-dot'>
            <div className='small-dot'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
