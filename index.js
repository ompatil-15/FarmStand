const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('MongoDB Connected Succesfully')
    })
    .catch (err => {
        console.log('MongoDB Connection Failed')
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


app.get('/products', async (req, res) => {

    const { category } = req.query;
    if (category){
        const products = await Product.find({category})
        res.render('products/index', { products, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    
})

app.get('/product/new', (req, res) => {
    res.render('products/new')
})
 
app.post('/products', async (req, res) => {
    const newProduct =  new Product(req.body);
    await newProduct.save();
    res.redirect(`/product/${newProduct._id}`)
})

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //no need to put / before products as views is in path variable
    res.render('products/show', { product })
})

app.get('/product/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product })
})

app.put('/product/:id/', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true});
    res.redirect(`/product/${product._id}`);
})

app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')



})

app.listen(4000, () => {
    console.log("Listening on PORT 3000")
})
