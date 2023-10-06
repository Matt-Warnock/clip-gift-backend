const ServiceResponse = require('./service-response');

class BadServiceResponse extends ServiceResponse {
  constructor(response) {
    super(response);
  }

  responseIsGood() {
    return false;
  }
  getResponseData() {
    let data;
    const error = this.response;
    
    if (error.response) {
      data = error.response.data;
    } else if (error.request) {
      data = error.request;
    } else {
      data = { message: `Error, ${error.message}` };
    }
    return data;
  }
}

module.exports = BadServiceResponse;