const sequelize = require("sequelize");
const Op = sequelize.Op;
const models = require("../models");
const users = models.users
const userDetails = models.userDetails
const projects = models.projects
const userBids = models.userBids
const helper = require("../helpers/helper");


module.exports = {
  createProject: async function (req, res) {
    try {
      var data = req.body;
      const required = {
        title: data.title,
        description: data.description,
        price: data.price,
        bidStartTime: data.bidStartTime,
        bidEndTime: data.bidEndTime,

      };
      const nonRequired = {};

      let requestData = await helper.vaildObject(required, nonRequired, res);
      requestData.userId = req.user.id
      
      if (requestData.bidStartTime > requestData.bidEndTime) throw 'Bid end time should be greater than bid start time.'
      let createUserProject = await projects.create(requestData)

      if (!createUserProject) return helper.serverError(res, {}, 'Something went wrong!')

      let msg = 'Project created successfully';
      return helper.true_status(res, createUserProject, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  projectsList: async function (req, res) {
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
      let getAllProjects = await projects.findAll({
        attributes: [`id`, `user_id`, `title`, `description`, `price`, `bid_start_time`, `bid_end_time`],
        include: [{
          model: userDetails,
          attributes: ['id', 'name', 'countryCode', 'phone', [sequelize.literal(`(IF (userDetail.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/userImages/', userDetail.image)) )`), 'image']],
          required: false
        }],
        where: {
          userId: {
            [Op.ne]: requestData.userId
          }
        },
        order: [
          ['id', 'desc']
        ],
        offset: offset,
        limit: parseInt(requestData.limit),
      });
      let msg = (getAllProjects.length > 0) ? 'Projects gets successfully' : 'No project found';
      return helper.true_status(res, getAllProjects, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  myProjectsList:async function(req,res){
    try{
      var data = req.query;
      const required = {
        page: data.page,  // page starts from 0
        limit: data.limit, // how many data will come in one time

      };
      const nonRequired = {};
      let requestData = await helper.vaildObject(required, nonRequired, res);
      requestData.userId = req.user.id
      let offset = parseInt(requestData.page) * parseInt(requestData.limit)
      let getMyProjects = await projects.findAll({
        attributes: [`id`, `user_id`, `title`, `description`, `price`, `bid_start_time`, `bid_end_time`],
        include: [
          {
          model: userBids,
          attributes: [`id`, `userId`, `projectId`, `price`, `description`],
          required: false,
          include: [{
            model: userDetails,
            attributes: ['id', 'name', 'countryCode', 'phone', [sequelize.literal('(IF(`userBids->userDetail`.image="", "'+baseUrl+'/uploads/default/avatar-1.png",CONCAT("'+baseUrl+'/uploads/userImages/", `userBids->userDetail`.image)))'), 'image']],
            required: false
          }],
        },
      ],
        where: {
          userId:  requestData.userId
        },
        order: [
          ['id', 'desc']
        ],
        offset: offset,
        limit: parseInt(requestData.limit),

      });
      let msg = (getMyProjects.length > 0) ? 'My Projects gets successfully' : 'No project found';
      return helper.true_status(res, getMyProjects, msg)
    }catch(err){
      return helper.error(res, err);
    }
  }
}