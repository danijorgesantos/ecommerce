const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const passport = require('passport');

//cloudninary
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;

// Load User model
const User = require('../models/ClientUser');

const Product = require('../models/Product');
const Collection = require('../models/Collection');

// @route   admin/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'it works for test' }));


// Authentication ----------------------------------------------------------------------------------------------------

// @route   POST admin/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        cart: []
    })
    bcrypt.hash(newUser.password, saltRounds, function (err, hash) {
        if (err) throw err;
        // Store hash in your password DB.
        newUser.password = hash;
        newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
    });
})

// @route   POST admin/addProductToUserCart
// @desc    update User Cart with new product
// @access  Public
router.post('/addProductToUserCart', (req, res) => {
    console.log('addProduct to cart', req.body)
    const newProduct = new Product({
        name: req.body.nameOfProduct,
        url: req.body.urlOfProduct,
        keywords: req.body.keywords,
        description: req.body.descriptionOfProduct,
        detailedDescription: req.body.detailedDescriptionOfProduct,
        price: req.body.price,
        mainPhoto1: req.body.mainPhoto1,
        mainPhoto2: req.body.mainPhoto2,
        mainPhoto3: req.body.mainPhoto3,
        mainPhoto4: req.body.mainPhoto4,
        mainPhoto5: req.body.mainPhoto5,
        mainPhoto6: req.body.mainPhoto6,
    });
    User.findById( req.body.id )
        .then(user => {
            const cart = user.cart
            console.log('user.cart',cart)
            cart.push(newProduct)
            console.log('user.cart after push',cart)
            User.findByIdAndUpdate(
                req.body.id,
                { cart: cart },
                { new: true })
                .then(product => res.json(product))
                .catch(err => console.log(err));
        })
})

// @route   POST admin/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    console.log(req.body)
    User.findOne({
        email
    })
        .then(user => {
            //check user
            if (!user) {
                return res.status(404).json({ email: 'User not found' })
            }
            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        //sign token
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            cart: user.cart
                        }
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            res.json({
                                id: payload.id,
                                name: payload.name,
                                email: payload.email,
                                cart: payload.cart,
                                success: true,
                                token: 'Bearer ' + token
                            })
                        });
                    } else {
                        return res.status(400).json({
                            password: 'Password incorrect'
                        });
                    }
                })
        })
})

// @route   POST admin/current
// @desc    Return user
// @access  Private
router.get('/current', (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        cart: req.body.cart
    });
})

// @route   POST admin/addCollection
// @desc    adicionar produto
// @access  Public
router.post('/addCollection', (req, res) => {
    const newCollection = new Collection({
        collectionPhoto: req.body.collectionPhoto,
        collectionName: req.body.collectionName,
        collectionUrl: req.body.collectionUrl,
    });
    newCollection
        .save()
        .then(collection => res.json(collection))
        .catch(err => console.log(err));
});

// @route   GET admin/getAllCollections
// @desc    get all Collections
// @access  Public
router.get('/getAllCollections', (req, res) => {
    Collection.find()
        .sort({ date: -1 })
        .then(collections => res.json(collections))
        .catch(err => res.status(404))
});

// @route   GET admin/getAllProductsFromCollection
// @desc    get all products from a single collection
// @access  Public
router.post('/getAllProductsFromCollection', (req, res) => {
    Collection.findOne({ collectionUrl: req.body.collectionUrl })
        .sort({ date: -1 })
        .then(colection => res.json(colection.collectionProducts))
        .catch(err => res.status(404))
});

// @route   GET admin/getSingleCollection
// @desc    get all products from a single collection
// @access  Public
router.post('/getSingleCollection', (req, res) => {
    Collection.findOne({ collectionUrl: req.body.collectionUrl })
        .sort({ date: -1 })
        .then(colection => res.json(colection))
        .catch(err => res.status(404))
});

// @route   GET admin/getAllProductsFromCollection
// @desc    get all products from a single collection
// @access  Public
router.post('/getSingleProductFromCollection', (req, res) => {
    Collection.findOne({ collectionUrl: req.body.collectionUrl })
        .sort({ date: -1 })
        .then(colection => {
            let product = null;
            const products = colection.collectionProducts;
            for (let i = 0; i < products.length; i++) {
                if (req.body.urlOfProduct === products[i].url) {
                    product = products[i];
                }
            }
            res.json(product)
        })
        .catch(err => res.status(404))
});


// @route   GET admin/getAllProductsFromCollection
// @desc    get all products from a single collection
// @access  Public
router.post('/getSingleProductFromCollection', (req, res) => {
    Collection.findOne({ collectionUrl: req.body.collectionUrl })
        .sort({ date: -1 })
        .then(colection => {
            let product = null;
            const products = colection.collectionProducts;
            for (let i = 0; i < products.length; i++) {
                if (req.body.urlOfProduct === products[i].url) {
                    product = products[i];
                }
            }
            res.json(product)
        })
        .catch(err => res.status(404))
});
































// o que eu preciso está daqui para baixo ----------------------------------------------------------------------------------------------

// @route   POST admin/addProduct
// @desc    adicionar produto
// @access  Public
router.post('/addProduct', (req, res) => {
    const newProduct = new Product({
        name: req.body.nameOfProduct,
        keywords: req.body.keywords,
        description: req.body.descriptionOfProduct,
        detailedDescription: req.body.detailedDescriptionOfProduct,
        price: req.body.price,
        mainPhoto1: req.body.mainPhoto1,
        mainPhoto2: req.body.mainPhoto2,
        mainPhoto3: req.body.mainPhoto3,
        mainPhoto4: req.body.mainPhoto4,
        mainPhoto5: req.body.mainPhoto5,
        mainPhoto6: req.body.mainPhoto6,
    });
    newProduct
        .save()
        .then(product => res.json(product))
        .catch(err => console.log(err));
});

// @route   GET admin/getAllProducts
// @desc    get all products
// @access  Public
router.get('/getAllProducts', (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then(articles => res.json(articles))
        .catch(err => res.status(404))
});

// @route   GET admin/upload
// @desc    fazer upload duma imagem para o cloudinary
// @access  Public
cloudinary.config({
    cloud_name: 'dthetakuv',
    api_key: '616382632955437',
    api_secret: 'hpid1G6JuJxYwFGpG71MYbuYUig'
})
router.use(fileupload({
    useTempFiles: true
}));
router.post('/upload', (req, res) => {
    const file = req.files.image;
    cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
        res.send({
            'result': result
        })
    })
})



// @route   GET admin/deleteProductById
// @desc    fazer delete dum producto
// @access  Public


router.post('/deleteProductById', (req, res) => {
    Product.findByIdAndDelete(req.body.id, function (err) {
        if (err) console.log(err);
    });
})


// @route   Get articles/getArticle
// @desc    get a single product from the database
// @access  Public
router.post('/getSingleProduct', (req, res) => {
    Product.findOne({ url: req.body.id })
        .then(product => res.json(product))
        .catch(err => res.status(404))
});

module.exports = router;