module.exports.handler = async (event) => {
  let message = "I don't know what type of clip you want!";

  if (event.queryStringParameters) {
    message = `I understand the request for a ${event.queryStringParameters.feel} type of clip`;
  }

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
