const tmi = require("tmi.js");

class TwitchClient {
  constructor(username, password, channel) {
    this.client = new tmi.Client({
      options: { debug: true },
      identity: {
        username,
        password,
      },
      channels: [channel],
    });

    this.connect = () => {
      return this.client.connect();
    }
  }
}

module.exports = TwitchClient;