const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('MongoDB Connected Succesfully')
    })
    .catch (err => {
        console.log('MongoDB Connection Failed')
        console.log(err);
    })

// const p = new Product({
//     name: 'Mango',
//     price: 250,
//     category: 'fruit'
// })

// p.save().then( p => {
//     console.log(p)
// })
// .catch(err => {
//     console.log(err)
// })

const seedProducts = [
    {   name: 'Mango', 
        price: '250',
        category: 'fruit'
    },
    {   name: 'Coconut', 
        price: '70',
        category: 'fruit'
    },
    {   name: 'Jackfruit', 
        price: '450',
        category: 'fruit'
    },
    {   name: 'Jamun', 
        price: '400',
        category: 'fruit'
    },
    {   name: 'Ice Cream Bean', 
        price: '500',
        category: 'fruit'
    },
    {   name: 'Carrot', 
        price: '100',
        category: 'vegetable'
    },
    {   name: 'Milk', 
        price: '80',
        category: 'dairy'
    }
]

Product.insertMany(seedProducts)
.then(res => {
    console.log(res)
})
.catch(err => {
    console.log(err)
})