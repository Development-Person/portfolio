import ScoreComponent from './Score';

function HeaderComponent({ score, data }) {
  return (
    <div className='header m-4 m-md-5 mb-0'>
      <h1>Journeys into Code</h1>
      <p>find the hidden satellites</p>
      <ScoreComponent score={score} data={data} />
    </div>
  );
}

export default HeaderComponent;
