

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const promotionsRouter = require('./Route/offersAndPromotionsRoute');
const notificationsRouter = require('./Route/notificationRoutes');
const app = express();

app.use(cors()); 
app.use(express.json());
app.use("/promotions", promotionsRouter);
app.use("/notifications", notificationsRouter)

// 0WHn2GM4gtta48st password


mongoose.connect("mongodb+srv://admin:MqbU2J2KroOcqZEa@cluster0.zcw7ay3.mongodb.net/")
.then(() => console.log("Connected to Database"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log(err));
