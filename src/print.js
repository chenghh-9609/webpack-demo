const printMe = () => {
  console.log('I get called from print.js');
  console.log("environment:",process.env.NODE_ENV);
};

export default printMe;