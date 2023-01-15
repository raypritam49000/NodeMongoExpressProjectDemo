const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.connect("mongodb://localhost:27017/order-service")
.then(()=>{
  console.log("Database connection established");
}).catch((error)=>{
    console.log("Database are not connected");
})