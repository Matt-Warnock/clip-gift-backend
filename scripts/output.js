function handler(data, serverless, options) {
  const globalExportData = {
    id: "782f3f8a-0bc6-43e8-86f0-8fcce89d541a",
    values: [
      {
        key: "endpoint",
        value: data.HttpApiUrl,
        type: "default",
        enabled: true,
      },
    ],
    name: "Globals",
    _postman_variable_scope: "globals",
    _postman_exported_at: "2023-09-19T17:31:19.724Z",
    _postman_exported_using: "Postman/10.18.3-230918-1447",
  };

  console.log(JSON.stringify(globalExportData));
}

module.exports = { handler };
