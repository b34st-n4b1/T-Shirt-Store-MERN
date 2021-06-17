require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//My Routes
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')
const paymentBRoutes = require('./routes/payment')

//DB Connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("DB CONNECTED")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//PORT
const port = process.env.PORT || 5000 ;

//My Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentBRoutes);

//Start Server
app.listen(port, () => console.log(`Server is running at Port ${port}`));
