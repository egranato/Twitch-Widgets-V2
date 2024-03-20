const { app, BrowserWindow } = require('electron')
const path = require('node:path');
const url = require('node:url');
const fs = require('node:fs');
const http = require('http');
const socketio = require('socket.io');
const express = require('express')();
const server = http.createServer(express);
const DataStore = require('./lib/data-store');

const createServer = () => {
	const dataStore = new DataStore(app.getPath('documents'));

	const io = socketio(server);
	io.on('connection', () => {
		console.log('Client Connected');
	});
	server.listen(3000);
};

const createWindow = () => {
	const mainWindow = new BrowserWindow({width: 1920, height: 1080})
	mainWindow.loadURL(url.format({
		pathname: path.join(
			__dirname,
			'dist/twitch-widgets-v2/browser/index.html'),
		protocol: 'file:',
		slashes: true
	}));
}

app.whenReady().then(() => {
  createServer();
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

app.on('window-all-closed', () => {
  server.close();
  if (process.platform !== 'darwin') app.quit()
});
