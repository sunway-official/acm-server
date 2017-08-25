const randomStr = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const commonUtils = {
  randomStr,
};

export default commonUtils;
