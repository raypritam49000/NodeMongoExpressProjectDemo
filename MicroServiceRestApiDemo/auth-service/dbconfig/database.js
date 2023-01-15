const mongoose = require("mongoose");

mongoose.set('debug', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

mongoose.connect("mongodb://localhost:27017/auth-service").then(() => {
    console.log(`DataBase Connection Established`);
}).catch((err) => { console.log(`Database does established`); });