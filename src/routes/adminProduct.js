const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');

const {
    getProductpage,
    getProductAdd,
    postProductAdd
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

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
}

const upload = multer({ storage: storage });

//router.Method('/route', handle)
router.get('/products', getProductpage);
router.get('/products/add-product', getProductAdd);
router.post('/products/add-product',
    [
        body('title').notEmpty().withMessage('Title must have a value.'),
        body('desc').notEmpty().withMessage('Description must have a value.'),
        body('price').isDecimal().withMessage('Price must have a value.')
    ], upload.single("image"), postProductAdd);
// router.post('/categories/add-category', body('title').notEmpty().withMessage('Title must have a value.'), postCategoryAdd);
// router.get('/categories/edit-category/:id', getCategoryEdit);
// router.put('/categories/edit-category/:id', body('title').notEmpty().withMessage('Title must have a value.'), putCategoryEdit);
// router.delete('/categories/delete-category/:id', deleteCategory);


module.exports = router; //export default 