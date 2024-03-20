const socketio = require('socket.io');
const TwitchClient = require('./twitch-client');

/*
accessable items:
io: socket io server
twitchClient: the twitch socket connection
*/
class SocketIO {
  constructor(server, dataStore) {
    this.io = socketio(server);

    this.io.on('connection', (connection) => {
		  console.log('IO Client Connected');
		  // console.log(connection);

      // get required start up data
		  const twitchUsername = dataStore.load('twitchUsername');
		  const twitchPassword = dataStore.load('twitchPassword');
		  const twitchChannel = dataStore.load('twitchChannel');

      // send to front end incase they need to be changed
		  this.io.emit('initialize', {twitchUsername, twitchPassword, twitchChannel});

      // required data has been filled out and we can now connect to twitch
      connection.on("twitchConnect", (data) => {
        this.twitchClient = new TwitchClient(data.username, data.password, data.channel);
        this.twitchClient.connect().then(() => {
          console.log('Connected to Twitch');
          dataStore.save('twitchUsername', data.username);
          dataStore.save('twitchPassword', data.password);
          dataStore.save('twitchChannel', data.channel);
        }).catch(console.error);
      });
    });
  }
}

module.exports = SocketIO;