const dotenv = require("dotenv");

let loaded = false;

function loadEnv() {
  if (loaded) {
    return;
  }

  dotenv.config({ path: ".env" });
  dotenv.config({ path: ".env.local", override: true });

  loaded = true;
}

module.exports = { loadEnv };
