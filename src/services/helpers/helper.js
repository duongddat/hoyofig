const helper = {
    covertTitle: function (string) {
        return string.length > 23 ? string.slice(0, 23) + '...' : string;
    },
};

module.exports = helper;