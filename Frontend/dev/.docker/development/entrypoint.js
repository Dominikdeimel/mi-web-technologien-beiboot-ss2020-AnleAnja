const { spawn } = require('child_process');
const sassWatcher = spawn('sass', ['--watch', 'assets/scss/styles.scss:public/css/styles.min.css', '--style=compressed']);
const webpackWatcher = spawn('npm', ['run', 'watch']);
const startApp = spawn('supervisor', ['src/app.js']);

sassWatcher.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

sassWatcher.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

sassWatcher.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

startApp.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

startApp.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

startApp.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

webpackWatcher.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

webpackWatcher.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

webpackWatcher.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
