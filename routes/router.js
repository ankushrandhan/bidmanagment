/*
|----------------------------------------------------------------------------------------------------------------
|   Router File
|----------------------------------------------------------------------------------------------------------------
|   All routers called in this file.
|
*/
const authRoutes = require('./auth');
const projectRouter = require('./project');
const bidsRouter = require('./userBids');

/*
|----------------------------------------------------------------------------------------------------------------
|   Middlewares
|----------------------------------------------------------------------------------------------------------------
*/
const isAuthentication = require('../helpers/authentication');

/*
|----------------------------------------------------------------------------------------------------------------
|   Route Files called with middlewares
|----------------------------------------------------------------------------------------------------------------
*/
module.exports = (app) => {

    app.use('/apis/auth/', authRoutes);
    app.use('/apis/project/', isAuthentication, projectRouter);
    app.use('/apis/bid/', isAuthentication, bidsRouter);
}