const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DataBase Connectd Successfully");
    })
    .catch((error)=>{
        console.log("DataBase Not Connectd");
    })