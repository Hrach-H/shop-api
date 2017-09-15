const express = require('express');
const router = express.Router();
const Products = require('../models/products');
const Users = require('../models/users');
const { check, validationResult } = require('express-validator/check');
const moment = require('moment');

/* ------------- PRODUCTS ------------- */

router.get('/products', function(req, res, next) {
   Products.find({}).then(products => {
       res.header('Access-Control-Allow-Origin', '*');
       res.send(products);
   })
       .catch(next);
});

router.post('/products', function(req, res, next) {
   Products.create(req.body).then(result => res.send(result) ).catch(next);
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
        Products.findOne({_id: productId}).then(response => {
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

router.post('/users', [
    // ----- VALIDATION -----

    check('firstName', 'Invalid First Name').exists().custom((value) => /^[a-z ,.'-]+$/i.test(value)),
    check('lastName', 'Invalid Last Name').exists().custom((value) => /^[a-z ,.'-]+$/i.test(value)),
    check('email', 'Invalid e-mail').isEmail(),
    check('birthDate', 'You must be 18 or older').exists().custom( value => {
        const date = new Date(value).getTime();
        const today = new Date().getTime();
        const diff = moment.duration(today - date).asYears();
        return diff >= 18
    } ),
    check('password', 'Password must be at least 5 char long').isLength({ min: 5}),
    check('passConfirm', 'Password confirmation field must have the same value as the password').exists().custom((value, { req }) => value === req.body.password)

    // ----- VALIDATION  END -----

], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.array().length) {
        Users.findOne({email: req.body.email}).then((response) => {
            if (response) {
                res.status(400).send({message: 'The email is already in use'});
            } else {
                const user = req.body;
                delete user.passConfirm;
                Users.create(user).then( result => res.send(result) );
            }
        })
    } else {
        let errs = [];
        for (let error of errors.array()) {
            errs.push(error.param + ': ' +error.msg);
        }
        res.status(400).send({message: errs.join(', ')});
    }

});

/* ------------- USERS END ------------- */

module.exports = router;
