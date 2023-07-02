const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');


const {
    getProductpage,
    getProductAdd,
    postProductAdd,
    getPorductEdit,
    putProductEdit,
    deleteProductDestroy,
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

router.get('/products/edit-product/:id', getPorductEdit);
router.put('/products/edit-product/:id',
    upload.single("image"),
    body('title').notEmpty().withMessage('Title must have a value.'),
    body('desc').notEmpty().withMessage('Description must have a value.'),
    body('price').isDecimal().withMessage('Price must have a value.'),
    putProductEdit);
router.delete('/products/delete-product/:id', deleteProductDestroy);
router.get('/products/add-product', getProductAdd);
router.post('/products/add-product',
    upload.single("image"),
    body('title').notEmpty().withMessage('Title must have a value.'),
    body('desc').notEmpty().withMessage('Description must have a value.'),
    body('price').isDecimal().withMessage('Price must have a value.'),
    postProductAdd);
router.get('/products', getProductpage);

module.exports = router; //export default 