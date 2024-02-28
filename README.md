# _prompt
A Sync prompt that kinda copies the original prompt behavior for electronjs (untested outside of my laptop)

# How to use
Simply require it in main.js
```js
const {Prompt} = require("./package/_prompt");
```

Then call the constructor (there's no personalisations yet for the windows and design)
```js
async function loadMainWindow() {
    win = new BrowserWindow({
        width: 800, height: 600, show: false, webPreferences: {
            preload: path.join(__dirname, 'preload.js'), nodeIntegration: true, contextIsolation: false
        }, autoHideMenuBar: true
    })

    win.loadURL(`file://${app.getAppPath()}/public/index.html?app_path=${app.getAppPath()}`).then(r => {
        win.show();
    });

    win.webContents.on('did-finish-load', () => {
        win.maximize();
    });

    new Prompt(ipcMain);
}
```

You can then call prompt from your renderer using 
```js
return ipcRenderer.sendSync('prompt', msg);
```
