export function numFormatter(x) {
  // > 10K
  if (x > 10000) return x.toExponential(2);

  return x.toFixed(2);
  // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
