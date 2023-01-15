const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DataBase Connected Successfully");
    })
    .catch((err) => {
        console.log(err);
    })