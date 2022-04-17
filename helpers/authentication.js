const Jwt = require('jsonwebtoken');
const models = require('../models');
const User= models.users
module.exports = (req, res, next) => {
  var token;

  if (req.headers && req.headers.token) {

    const credentials = req.headers.token;
    token = credentials;
    //console.log(token,"tokn");return
  } else {
    return res.status(401).json({
      'success': 0,
      'code': 401,
      'msg': 'ACCESS DENIED !! You are not authorize to access this Resource!',
      'data': {},
    });
  }
  Jwt.verify(token, process.env.JWT_SECRETKEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        'success': 0,
        'code': 401,
        'msg': 'The token is not valid!',
        'data': {},
      });
    } else {
      let userDetail = await User.findOne({
        where: {
          email: decoded.email,
        },
        raw: true
      })
      if(!userDetail){
        return res.status(401).json({
          'success': 0,
          'code': 401,
          'msg': 'The token is not valid!',
          'data': {},
        });
      }
      req.user = userDetail;
      next()
    }
  });
};
