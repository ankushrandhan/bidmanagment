/*
|-------------------------------------------------------------------------------------------------------
| Constants File
|-------------------------------------------------------------------------------------------------------
| In this file all the constants set to globals for using them through out the project.
|
*/
global.moment = require('moment');

global.currentTime = moment().format('HH:mm:ss')
global.appPort = 2310;

global.securityKey = 'bidManagement';

global.appName = 'Bid Management System';

global.appShortName = 'BMS';

global.appVersion = '0.0.1';

global.companyName = 'Bid Management System';

global.companyUrl = '#';

global.copyrightYear = '2022';


module.exports = global;

