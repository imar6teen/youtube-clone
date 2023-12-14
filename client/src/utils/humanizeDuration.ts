function humanizeDuration(seconds: number) {
  const hour = Math.floor(seconds / 60 / 60);
  const min = Math.floor((seconds / 60) % 60);
  const sec = Math.floor((seconds % 60) % 60);

  let hourString = Math.floor(hour / 10) === 0 ? `0${hour}:` : `${hour}:`;
  let minString = Math.floor(min / 10) === 0 ? `0${min}` : `${min}`;
  let secString = Math.floor(sec / 10) === 0 ? `:0${sec}` : `:${sec}`;

  hourString = hour ? hourString : "";
  minString = hour || min ? minString : "";

  return hourString + minString + secString;
}

export default humanizeDuration;
