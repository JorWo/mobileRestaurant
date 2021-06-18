const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Order = require('./models/order');
var tables = 10;

//Connect to mongodb database
mongoose.connect('mongodb+srv://jordini:linguini@cluster0.7lkyv.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Set view engine
app.set('view engine', 'ejs');

//Load website
app.use(express.static('website'));
app.get('/', (req,res) => {
    res.render('index', { tableNum: req.query.table });   
});
app.get('/cart', (req,res) => {
    res.render('cart', { tableNum: req.query.table });
});
app.get('/beverages', (req,res) => {
    res.render('beverages', { tableNum: req.query.table });
});
app.get('/appetizers', (req,res) => {
    res.render('appetizers', { tableNum: req.query.table });
});
app.get('/entrees', (req,res) => {
    res.render('entrees', { tableNum: req.query.table });
});
app.get('/desserts', (req,res) => {
    res.render('desserts', { tableNum: req.query.table });
});

//Fetch order from website and insert into mongodb
app.use(bodyParser.json());
app.post('/api/order', async (req,res) => {
    console.log(req.body);
    const {tableNum, order, subtotal, total} = req.body;

    await Order.create({
        tableNum,
        order, 
        subtotal,
        total
    });

    res.json({status: 'ok'});
})

//Load kitchen view and its orders
app.get('/kitchen', async (req,res) =>{
    Order.find({}, (err,data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('kitchen', { tableOrder: data });
        }
    })
});

//Load server onto a port
app.listen(process.env.PORT || 3000, () => console.log('App avaiable on http://localhost:3000'));
