module.exports = async (req, res, next) => {

    global.baseUrl = `${req.protocol}://${req.get('host')}`;
    return next();
}