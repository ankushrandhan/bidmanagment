var express = require('express');
var router = express.Router();
const projectController = require('../controller/projectController');

 router.post('/createProject',projectController.createProject);
 router.get('/projectsList',projectController.projectsList); // project list api for place bid
 router.get('/myProjectsList',projectController.myProjectsList);
module.exports = router;
