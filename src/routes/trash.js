const express = require('express')
const router = express.Router()

const { getTrashPage } = require('../app/controllers/trashController');

//router.Method('/route', handle)
router.get('/', getTrashPage);

module.exports = router; //export default 