function ScrollButton() {
  const onClick = () => {
    console.log('clicked');
  };

  return <button onClick={onClick} className='scroll-button'></button>;
}

export default ScrollButton;
