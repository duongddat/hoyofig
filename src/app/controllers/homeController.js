const getHomepage = (req, res) => {
    res.render('home.ejs');
}

const getTest = (req, res) => {
    res.render('sample.ejs');
}

module.exports = {
    getHomepage,
    getTest
}