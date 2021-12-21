function ScrollButton(props) {
  const onClick = () => {
    window.scrollBy({
      top: 0,
      left: 1000 * props.direction,
      behavior: 'smooth',
    });
    return;
  };

  return (
    <button
      onClick={onClick}
      className='scroll-button'
      style={props.style}></button>
  );
}

export default ScrollButton;
