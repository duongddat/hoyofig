const getHomepage = (req, res) => {
    res.send('Home page');
}

const getTest = (req, res) => {
    res.render('sample.ejs');
}

module.exports = {
    getHomepage,
    getTest
}