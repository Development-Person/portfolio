function DotComponent(props) {
  console.log(props.animation);

  return (
    <>
      <div className={props.animation}>
        <div className='dot'>
          <div className='large-dot'>
            <div className='small-dot'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DotComponent;
