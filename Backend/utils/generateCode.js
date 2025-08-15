const generateCode = (codelength) => {
  let code = "";
  for (let i = 0; i < codelength; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};

module.exports = generateCode;
