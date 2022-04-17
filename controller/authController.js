const sequelize = require("sequelize");
const Op = sequelize.Op;
const models = require("../models");
const users = models.users
const userDetails = models.userDetails
const helper = require("../helpers/helper");
const jwt = require('jsonwebtoken');

module.exports = {
  userSignup: async function (req, res) {
    try {
      var data = req.body;
      const required = {
        email: data.email,
        countryCode: data.countryCode,
        phone: data.phone,
        gender: data.gender, // 1=>male,2=>female
        name: data.name,
        password: data.password,
        deviceType: data.deviceType,// 1=>android,2=>ios
        deviceToken: data.deviceToken,
      };
      const nonRequired = {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      };
      let requestData = await helper.vaildObject(required, nonRequired, res);

      let checkUserEmail = await users.count({
        where: {
          email: requestData.email
        }
      });
      if (checkUserEmail > 0) throw 'Email already exist please use another.'

      let checkUserPhone = await userDetails.count({
        where: {
          countryCode: requestData.countryCode,
          phone: requestData.phone
        }
      })
      if (checkUserPhone > 0) throw 'Phone number already exist please use another.'

      let Password = helper.bcryptHash(requestData.password);

      let token = jwt.sign({ email: requestData.email }, process.env.JWT_SECRETKEY, { expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME })
      let createUser = await users.create({
        email: req.body.email,
        password: Password,
        token: token
      });

      if (!createUser) return helper.serverError(res, {}, 'Something went wrong!')

      var uploadUserImage = ''
      let folder = 'userImages'
      if (req.files && req.files.image) {
        var uploadUserImage = await helper.imageUpload(req.files.image, folder)
      }

      let createUserdetail = await userDetails.create({
        userId: createUser.id,
        name: requestData.name,
        countryCode: requestData.countryCode,
        phone: requestData.phone,
        gender: requestData.gender,
        deviceType: requestData.deviceType,
        deviceToken: requestData.deviceToken,
        image: uploadUserImage,
        address: requestData.address,
        latitude: requestData.latitude,
        longitude: requestData.longitude
      });
      let objectData = {
        userId: createUser.id
      }
      if (!createUserdetail) return helper.serverError(res, {}, 'Something went wrong!')
      let getUserData = await module.exports.getUserDetail(objectData, req);
      if (!getUserData) throw 'No data found.'

      getUserData.email = requestData.email
      getUserData.token = token
      let msg = 'Sign up successfully';
      return helper.true_status(res, getUserData, msg)
    } catch (err) {
      return helper.error(res, err);
    }
  },
  userLogin: async function (req, res) {
    try {
      var data = req.body;
      const required = {
        email: data.email,
        password: data.password,
        deviceType: data.deviceType,  // 1=>android,2=>ios
        deviceToken: data.deviceToken,
      };
      const nonRequired = {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude
      };

      let requestData = await helper.vaildObject(required, nonRequired, res);

      let checkEmail = await users.findOne({
        attributes: ['id', 'password', 'email'],
        where: {
          email: requestData.email,
        },
        raw: true
      });

      if (!checkEmail) throw 'Email is incorrect.'

      let checkPassword = await helper.comparePass(
        requestData.password,
        checkEmail.password
      );
      if (!checkPassword) throw 'Password is incorrect.'

      let token = jwt.sign({ email: requestData.email }, process.env.JWT_SECRETKEY, { expiresIn: process.env.JWT_TOKEN_EXPIRE_TIME })

      await users.update({
        token: token
      }, {
        where: {
          id: checkEmail.id
        }
      });

      await userDetails.update({
        deviceType: requestData.deviceType,
        deviceToken: requestData.deviceToken,
        address: requestData.address,
        latitude: requestData.latitude,
        longitude: requestData.longitude
      }, {
        where: {
          userId: checkEmail.id
        }
      });

      let objectData = {
        userId: checkEmail.id
      }
      let getUserData = await module.exports.getUserDetail(objectData, req);
      if (!getUserData) throw 'No data found.'

      getUserData.email = requestData.email
      getUserData.token = token

      let msg = 'Log in successfully';
      return helper.true_status(res, getUserData, msg)

    } catch (err) {
      return helper.error(res, err);
    }
  },
  getUserDetail: async function (objectData, req) {

    let getUser = await userDetails.findOne({
      attributes: ['id', 'userId', 'name', 'countryCode', 'phone', 'gender', [sequelize.literal(`(IF (userDetails.image='', '${baseUrl}/uploads/default/avatar-1.png', CONCAT('${baseUrl}/uploads/userImages/', userDetails.image)) )`), 'image']],
      where: objectData,
      raw: true
    });
    return getUser
  }
}