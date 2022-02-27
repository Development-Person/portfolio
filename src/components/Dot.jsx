import { isTouchScreenDevice } from '../functions/isTouchScreenDevice';

function DotComponent({ animation, updateScore, addDiscoverAnimation }) {
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
            <div className='small-dot'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
