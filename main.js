const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
    // 1. Create the browser window
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "AI Scholar",
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webviewTag: true, // Crucial for the browser view
            spellcheck: true  // Enables spellcheck
        }
    });

    // 2. CRITICAL FIX: Create a standard menu so Input/Copy/Paste works
    const template = [
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'delete' },
                { type: 'separator' },
                { role: 'selectAll' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' }, // Useful for debugging
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    // 3. NOW hide the menu bar visually (but the logic remains active)
    mainWindow.setMenuBarVisibility(false);

    // 4. Load your interface
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});