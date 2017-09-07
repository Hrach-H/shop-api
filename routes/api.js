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

// router.patch('/products/:id', function(req, res, next) {
//     Products.findOne({_id: req.params.id}).then(function (response) {
//         var patches = [ {op: 'replace', path: '/availableQuantity', value: req.body[Object.keys(req.body)[0]]}  ];
//         response.patch(patches, function callback(err) {
//             if (err) return next(err);
//             res.send(response);
//         });
//     });
// });

router.patch('/products/', function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'PATCH');
    for (var productId in req.body) {
        Products.findOne({_id: productId}).then(function (response) {
            var patches = [ {op: 'replace', path: '/availableQuantity', value: req.body[productId].availableQuantity}  ];
            response.patch(patches, function callback(err) {
                if (err) return next(err);
                res.send(response);
            });
        });
    }
});

module.exports = router;
