const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const {
    getCategorypage,
    getCategoryAdd,
    postCategoryAdd,
    getCategoryEdit,
    putCategoryEdit,
} = require('../app/controllers/categoryController');

//router.Method('/route', handle)
router.get('/categories', getCategorypage);
router.get('/categories/add-category', getCategoryAdd);
router.post('/categories/add-category', body('title').notEmpty().withMessage('Title must have a value.'), postCategoryAdd);
router.get('/categories/edit-category/:id', getCategoryEdit);
router.put('/categories/edit-category/:id', body('title').notEmpty().withMessage('Title must have a value.'), putCategoryEdit);


module.exports = router; //export default 