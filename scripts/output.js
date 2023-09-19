const { spawn } = require("child_process");

function handler(cfdata, serverless, options) {
  const globalVar = `endpoint=${cfdata.HttpApiUrl}`

  const newman = spawn("newman run fixtures/clipgift-endpoint-tests.postman_collection.json", [`--global-var ${globalVar}`]);

  newman.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  newman.stderr.on("data", (data) => {
    console.log(`stderr: ${data}`);
  });

  newman.on("error", (error) => {
    console.log(`error: ${error.message}`);
  });

  newman.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  console.log("endpoint", cfdata.HttpApiUrl);
}

module.exports = { handler };
