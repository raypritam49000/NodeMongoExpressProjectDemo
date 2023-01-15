const schedule = require('node-schedule');
const nodeCron = require('node-cron');
const axios = require('axios');
const shell = require('shelljs');

schedule.scheduleJob('my-job', '* * * * * *', async () => {
    console.log("This is node-schedule scheduled @ ", new Date().toString());
    // schedule.cancelJob('my-job');
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(response.data);

    if (shell.exec("dir").code !== 0) {
        console.log("Something went wrong");
    }
});

nodeCron.schedule('* * * * * *', async () => {
    console.log("This is node-cron scheduled @ ", new Date().toString());
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(response.data);

    if (shell.exec("dir").code !== 0) {
        console.log("Something went wrong");
    }
});


setInterval(async () => {
    console.log("This is setInterval scheduled @ ", new Date().toString());
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(response.data);

    if (shell.exec("dir").code !== 0) {
        console.log("Something went wrong");
    }
}, 1000);


setTimeout(async () => {
    console.log("This is setTimeout scheduled @ ", new Date().toString());
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(response.data);

    if (shell.exec("dir").code !== 0) {
        console.log("Something went wrong");
    }
}, 1000);