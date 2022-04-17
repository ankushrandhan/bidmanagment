const sequelize = require("sequelize");
const Op = sequelize.Op;
const models = require("../models");
const users = models.users
const projects = models.projects
const userBids = models.userBids
const helper = require("../helpers/helper");


module.exports = {
  placeBid: async function (req, res) {
    try {
      var data = req.body;
      const required = {
        price: data.price,
        projectId: data.projectId,

      };
      const nonRequired = {
        description: data.description,
      };

      let requestData = await helper.vaildObject(required, nonRequired, res);
      requestData.userId = req.user.id

      let checkProjectExistance = await projects.count({
        where: {
          id: requestData.projectId,
        }
      });
      if (checkProjectExistance == 0) throw 'Project does not exist.'
      
      whereObj = {
        id: requestData.projectId,
        bidStartTime: {
          [Op.lte]: currentTime
        },
        bidEndTime: {
          [Op.gte]: currentTime
        }
      }
      let checkProjectActive = await module.exports.checkBidActive(whereObj);

      if (requestData.userId == checkProjectActive.userId) throw `You can't bid to your own project.`

      if (!checkProjectActive) throw `You can't bid at that time as bid is Inactive for this project at this time.`
     
      let checkbidExistance = await userBids.count({
        where: {
          projectId: requestData.projectId,
          userId: requestData.userId
        }
      });
      if (checkbidExistance >= 1) throw 'You already bid on this project.'



      let createBid = await userBids.create(requestData)
      if (!createBid) return helper.serverError(res, {}, 'Something went wrong!')

      let msg = 'Bid placed successfully';
      return helper.true_status(res, createBid, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  projectBidList: async function (req, res) {
    try {
      var data = req.query;
      const required = {
        projectId: data.projectId,
        page: data.page,  // page starts from 0
        limit: data.limit, // how many data will come in one time

      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired, res);
      requestData.userId = req.user.id
      let offset = parseInt(requestData.page) * parseInt(requestData.limit)
      let getBids = await projects.findAll({
        attributes: [`id`, `userId`, `title`, `description`, `price`, `bidStartTime`, `bidEndTime`],
        include: [{
          model: userBids,
          attributes: [`id`, `userId`, `projectId`, `price`, `description`],
        }],
        where: {
          id: requestData.projectId
        },
        offset: offset,
        limit: parseInt(requestData.limit),
      });

      let msg = (getBids.length > 0) ? 'Bids gets successfully' : 'No bid found';
      return helper.true_status(res, getBids, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  updateBid: async function (req, res) {
    try {
      var data = req.body;
      const required = {
        bidId: data.bidId,
        projectId: data.projectId,
        price: data.price,
      };
      const nonRequired = {
        description: data.description,
      };

      let requestData = await helper.vaildObject(required, nonRequired, res);
      requestData.userId = req.user.id
      let checkBidsExistance = await userBids.count({
        where: {
          id: requestData.bidId,
          userId : requestData.userId
        }
      });
      if (checkBidsExistance == 0) throw `You can't update bid.`
      whereObj = {
        id: requestData.projectId,
        bidStartTime: {
          [Op.lte]: currentTime
        },
        bidEndTime: {
          [Op.gte]: currentTime
        }
      }
      let checkProjectActive = await module.exports.checkBidActive(whereObj);

      if (!checkProjectActive) throw `You can't bid at that time as bid is Inactive for this project at this time.`
      await userBids.update(requestData, {
        where: {
          id: requestData.bidId
        }
      });

      let msg = 'Bids updated successfully';
      return helper.true_status(res, {}, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  myBids: async function (req, res) {
    try {
      var data = req.query;
      const required = {
        page: data.page,  // page starts from 0
        limit: data.limit, // how many data will come in one time
      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired, res);
      requestData.userId = req.user.id
      let offset = parseInt(requestData.page) * parseInt(requestData.limit)
      let getMyBids = await userBids.findAll({
        attributes: [`id`, `userId`, `projectId`, `price`, `description`],
        include: [{
          model: projects,
          attributes: [`id`, `userId`, `title`, `description`, `price`, `bidStartTime`, `bidEndTime`],
        }],
        where: {
          userId: requestData.userId
        },
        order: [
          ['id', 'desc']
        ],
        offset: offset,
        limit: parseInt(requestData.limit),
      });

      let msg = (getMyBids.length > 0) ? 'My Bids gets successfully' : 'No bid found';
      return helper.true_status(res, getMyBids, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  checkBidActive: async function (getObject) {
    let getProjectActive = await projects.findOne({
      attributes: ['id', 'bidStartTime', 'bidEndTime', 'userId'],
      where: getObject,
      raw: true
    });

    return getProjectActive;
  }
}