const mongoose = require("mongoose");
//const { MongoClient, ServerApiVersion } = require('mongodb');

//DB_URI = mongodb+srv://HasanRaza:welfarestate90@basketbistro.kbzgzz5.mongodb.net/Ecommerce?retryWrites=true&w=majority
//DB_URI = mongodb+srv://HasanRaza:welfarestate90@basketbistro.xu576.mongodb.net/BasketBistro?retryWrites=true&w=majority
//DB_URI = mongodb+srv://HasanRaza:welfarestate90@basketbistro.xu576.mongodb.net/?retryWrites=true&w=majority&appName=BasketBistro
//192.168.0.106


const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log("error: ",err)
    });
};



module.exports = connectDatabase;