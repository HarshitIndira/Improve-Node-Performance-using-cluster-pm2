const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {

    }
}


app.get('/', (req, resp) => {
    resp.send(`Performance example ${process.pid}`);
});

app.get('/timer', (req, resp) => {
    delay(9000);
    resp.send(`Code executed with log code : ${process.pid}`);
})

if (cluster.isMaster) {
    console.log("Master started");

    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

} else {
    console.log("Worker started");
    app.listen(3000);
}


