const getCategorypage = (req, res) => {
    res.render('admin/createCategory.ejs');
}

const getCategoryAdd = (req, res, next) => {
    res.render('admin/createCategory.ejs');
}

const postCategoryAdd = (req, res, next) => {

}

module.exports = {
    getCategorypage,
    getCategoryAdd,
    postCategoryAdd,
}