var express = require('express');
var router = express.Router();

const bidsController = require('../controller/bidsController');

 router.post('/placeBid',bidsController.placeBid);
 router.get('/projectBidList',bidsController.projectBidList);
 router.put('/updateBid',bidsController.updateBid);
 router.get('/myBids',bidsController.myBids);
 
module.exports = router;
