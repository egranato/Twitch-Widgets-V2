const fs = require('node:fs');
const path = require('node:path');

const DATA_STORE_FOLDER = 'Twitch Companion';
const DATA_STORE_FILE = "app.data.json";

class DataStore {
  constructor(basePath) {
    this.dataStorePath = path.join(basePath, DATA_STORE_FOLDER);
    this.dataStoreFile = path.join(this.dataStorePath, DATA_STORE_FILE);

    this.getData = () => {
      const raw = fs.readFileSync(this.dataStoreFile).toString()
      return JSON.parse(raw);
    };

    this.setData = (data) => {
      const raw = JSON.stringify(data);
      fs.writeFileSync(this.dataStoreFile, raw);
    };

    this.save = (key, data) => {
      const store = this.getData();
      store[key] = data;
      this.setData(store);
    };

    this.load = (key) => {
      const store = this.getData();
      return store[key];
    };

    if (!fs.existsSync(this.dataStorePath)) {
      fs.mkdirSync(this.dataStorePath);
    }

    if (!fs.existsSync(this.dataStoreFile)) {
      fs.writeFileSync(this.dataStoreFile, '{}');
    }
  }
}

module.exports = DataStore;