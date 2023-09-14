const feelMessenger = (queryParameters) => {
  let message = "I don't know what type of clip you want!";

  if (queryParameters.feel) {
    message = `I understand the request for a ${queryParameters.feel} type of clip`;
  }

  return message;
};

module.exports = feelMessenger;
