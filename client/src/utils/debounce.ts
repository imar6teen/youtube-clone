const debounce = (fn: any, delay: any) => {
  let timeoutID: any;
  return function (...args: any) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default debounce;
