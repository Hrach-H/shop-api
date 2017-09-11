const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const Users = require('../models/users');

/* ------------- PRODUCTS ------------- */

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
    // res.header('Access-Control-Allow-Methods', 'PATCH');
    var finalResponse;
    for (var productId in req.body) {
        Products.findOne({_id: productId}).then(function (response) {
            var patches = [ {op: 'replace', path: '/availableQuantity', value: req.body[productId].availableQuantity}  ];
             response.patch(patches, function callback(err) {
                if (err) return next(err);
            });
             finalResponse = response;
        });
    }
    res.send(finalResponse);
});

/* ------------- PRODUCTS END ------------- */

/* ------------- USERS ------------- */

router.post('/users', function(req, res, next) {

    // Validation for email
    req.checkBody('email', 'Email is required').isEmail();

    req.getValidationResult()
        .then(result => {
            if (!result.array().length) {
                Users.create(req.body).then(function(result) {
                    res.send(result);
                })
            } else {
                res.send('The e-mail you entered is not correct');
            }
        }).catch(next);
});

/* ------------- USERS END ------------- */

module.exports = router;
