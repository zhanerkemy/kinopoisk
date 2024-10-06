const {Rates} = require('./Rates')

const saveRate = (req, res) => {
    console.log(req.body);
    res.send('ok')
}

module.exports = {
    saveRate
}