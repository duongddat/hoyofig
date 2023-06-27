const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const multer = require('multer');


const {
    getProductpage,
    getProductAdd,
    postProductAdd,
    getPorductEdit
} = require('../app/controllers/productController');


//Image Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + file.originalname;
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const upload = multer({ storage: storage });

//router.Method('/route', handle)
router.get('/products', getProductpage);
router.get('/products/add-product', getProductAdd);
router.post('/products/add-product',
    upload.single("image"),
    body('title').notEmpty().withMessage('Title must have a value.'),
    body('desc').notEmpty().withMessage('Description must have a value.'),
    body('price').isDecimal().withMessage('Price must have a value.'),
    postProductAdd);
router.get('/products/edit-product/:id', getPorductEdit);
// router.put('/categories/edit-category/:id', body('title').notEmpty().withMessage('Title must have a value.'), putCategoryEdit);
// router.delete('/categories/delete-category/:id', deleteCategory);


module.exports = router; //export default 