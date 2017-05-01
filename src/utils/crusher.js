export function getAvgFromArray(data) {
  let result = 0;
  let length = data.length;
  data.forEach((d) => {
    if (isNaN(d)) {
      length -= 1;
    } else {
      result += parseInt(d, 10);
    }
  });
  if (length > 0) return (result / length);
  else return null;
}
