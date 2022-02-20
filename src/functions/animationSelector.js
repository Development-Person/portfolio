export function animationSelector(iterations) {
  const animationsArray = [];

  for (let i = 0; i < iterations; i++) {
    animationsArray.push(`dot-animation${Math.ceil(Math.random() * 7)}`);
  }

  return animationsArray;
}
