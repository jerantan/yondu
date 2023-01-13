const response = (info) => {
  return {
    status: info.stat === 1? 'OK' : 'FAILED',
    message: info.msg,
    data: info.data
  };
};

module.exports = response;