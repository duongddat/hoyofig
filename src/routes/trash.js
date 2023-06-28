const express = require('express')
const router = express.Router()

const { getTrashPage } = require('../app/controllers/trashController');
const { patchProductRestore, deleteProductTrash } = require('../app/controllers/productController');

//router.Method('/route', handle)
router.get('/', getTrashPage);
router.delete('/delete-product/:id', deleteProductTrash);
router.patch('/restore-product/:id', patchProductRestore);

module.exports = router; //export default 