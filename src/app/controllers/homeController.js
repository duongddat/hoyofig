const getHomepage = (req, res, next) => {

    res.render('home.ejs');
}

const getAboutUspage = (req, res) => {
    res.send('About page');
}

const getContactpage = (req, res) => {
    res.send('Contact page');
}

module.exports = {
    getHomepage,
    getAboutUspage,
    getContactpage,
}