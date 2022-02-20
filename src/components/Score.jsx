function ScoreComponent({ score, data }) {
  return (
    <p>
      {score} / {data.length}
    </p>
  );
}

export default ScoreComponent;
