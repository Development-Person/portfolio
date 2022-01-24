function DotComponent(props) {
  function discoverElement(e) {
    e.preventDefault();

    e.target.classList.remove('dot-hidden');

    if (e.target.parentNode) {
      if (e.target.parentNode.classList.contains('dot-hidden')) {
        e.target.parentNode.classList.remove('dot-hidden');
      } else if (e.target.parentNode.parentNode) {
        if (e.target.parentNode.parentNode.classList.contains('dot-hidden')) {
          e.target.parentNode.parentNode.classList.remove('dot-hidden');
        }
      }
    }
  }

  return (
    <>
      <div className={props.animation}>
        <div onClick={discoverElement} className='dot dot-hidden'>
          <div onClick={discoverElement} className='large-dot'>
            <div onClick={discoverElement} className='small-dot'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
