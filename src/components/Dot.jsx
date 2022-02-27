import { isTouchScreenDevice } from '../functions/isTouchScreenDevice';
import { useState } from 'react';
import Modal from 'react-modal';
import CardComponent from './Card';

function DotComponent({ data, animation, updateScore, addDiscoverAnimation }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('.App');

  function openModal() {
    console.log('openModal function triggered');
    setIsOpen(true);
  }

  function afterOpenModal() {
    return;
  }

  function closeModal() {
    setIsOpen(false);
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
      <div className={animation}>
        <div onClick={discoverElement} className='dot dot-hidden'>
          <div className='large-dot'>
            <div className='small-dot'>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel='Example Modal'>
                <button onClick={closeModal}>close</button>
                <CardComponent data={data} />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
