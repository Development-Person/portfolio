function DotComponent(props) {
  const onClick = () => {
    console.log(props.info);
  };

  return <div onClick={onClick} className='dot' style={props.style}></div>;
}

export default DotComponent;
