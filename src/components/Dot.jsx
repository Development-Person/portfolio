import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

function DotComponent(props) {
  let subtitle;

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

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onClick = () => {
    openModal();
  };

  return (
    <>
      <div onClick={onClick} className='dot' style={props.style}></div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Project Modal'>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{props.info}</h2>
        <div>Some info about the project I made</div>
        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  );
}

export default DotComponent;
