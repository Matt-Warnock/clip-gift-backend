const feelMessenger = require("../../domain/feel-messenger");

module.exports.handler = async (event) => {
  const message = feelMessenger(event.queryStringParameters);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: message,
        input: event,
      },
      null,
      2
    ),
  };
};
