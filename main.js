const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "AI Scholar",
        icon: path.join(__dirname, 'icon.png'), // Optional: Add an icon later
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Allows simple interaction between UI and Logic
            webviewTag: true         // CRITICAL: This enables the 'browser-in-browser' feature
        }
    });

    // Remove the default menu bar (File, Edit, etc.) for a cleaner look
    mainWindow.setMenuBarVisibility(false);

    // Load your HTML file
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