const express = require('express');
const app = express();
const { readFile } = require('fs').promises;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Order = require('./models/order');

//Connect to mongodb database
mongoose.connect('mongodb+srv://jordini:linguini@cluster0.7lkyv.mongodb.net/Cluster0?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Load website
app.use(express.static('website'));
app.use(bodyParser.json());
app.get('/', async (req, res) => {
   res.send(await readFile('./website/index.html', 'utf8'));
});

//Fetch order from website and insert into mongodb
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

//Load server onto a port
app.listen(process.env.PORT || 3000, () => console.log('App avaiable on http://localhost:3000'));
