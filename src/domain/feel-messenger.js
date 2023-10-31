const feelMessenger = (queryParameters) => {
  return queryParameters && queryParameters.feel
    ? `I understand the request for a ${queryParameters.feel} type of clip`
    : "I don't know what type of clip you want!"
}

module.exports = feelMessenger
