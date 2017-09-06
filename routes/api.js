const express = require('express');
const router = express.Router();
const Products = require('../models/products');

router.get('/products', function(req, res, next) {
   Products.find({}).then(function (products) {
       res.header('Access-Control-Allow-Origin', '*');
       res.send(products);
   })
});

router.post('/products', function(req, res, next) {
   Products.create(req.body).then(function(result) {
       res.send(result);
   }).catch(next);
});

module.exports = router;
