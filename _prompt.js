const {BrowserWindow} = require('electron')
const fs = require('fs');

class Prompt {
    ev = null;
    dialogue_window = null;

    constructor(ipcMain) {
        ipcMain.on('prompt', (event, args) => {
            this.ev = event;
            this.dialogue_window = new BrowserWindow({
                width: 400, height: 200, show: false, webPreferences: {
                    nodeIntegration: true, contextIsolation: false
                }, autoHideMenuBar: true, frame: false
            });

            this.dialogue_window.loadURL(`file://${__dirname}/_prompt.html?field_name=${args}`).then(r => {
                this.dialogue_window.show();

                ipcMain.on('prompt-reply-child', (event_child, args) => {
                    this.ev.returnValue = args;
                });
            });

            this.closeEvents(this.dialogue_window)
        });

        ipcMain.on('confirm', (event, args) => {
            this.ev = event;
            this.dialogue_window = new BrowserWindow({
                width: 400, height: 200, show: false, webPreferences: {
                    nodeIntegration: true, contextIsolation: false
                }, autoHideMenuBar: true, frame: false
            });

            this.dialogue_window.loadURL(`file://${__dirname}/_confirm.html?field_name=${args}`).then(r => {
                this.dialogue_window.show();

                ipcMain.on('confirm-reply-child', (event_child, args) => {
                    this.ev.returnValue = args;
                    this.dialogue_window.destroy()
                });
            });

            this.closeEvents()
        });
    }

    closeEvents() {
        this.dialogue_window.on('close', (e) => {
            e.preventDefault();
        });

        this.dialogue_window.on('closed', (e) => {
            e.preventDefault();
        });
    }
}

exports.Prompt = Prompt;