const helper = {
    covertTitle: function (string) {
        return string.length > 23 ? string.slice(0, 23) + '...' : string;
    },
    covertPrice: function (price) {
        return parseFloat(price).toFixed(2);
    }
};

module.exports = helper;