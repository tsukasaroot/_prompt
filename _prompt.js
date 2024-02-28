const {BrowserWindow} = require('electron')

class Prompt {
    constructor(ipcMain) {
        ipcMain.on('prompt', (event, args) => {
            let dialogue_window = new BrowserWindow({
                width: 400, height: 200, show: false, webPreferences: {
                    nodeIntegration: true, contextIsolation: false
                }, autoHideMenuBar: true
            });

            dialogue_window.loadURL(`file://${__dirname}/_prompt.html?field_name=${args}`).then(r => {
                dialogue_window.show();

                ipcMain.on('prompt-reply-child', (event_child, args) => {
                    event.returnValue = args;
                });
            });

            dialogue_window.on('close', () => {
                dialogue_window = null;
            });

            dialogue_window.on('closed', () => {
                dialogue_window = null;
            });
        });
    }
}

exports.Prompt = Prompt;