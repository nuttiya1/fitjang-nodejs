var SequelizeMock = require('sequelize-mock');
var dbMock = new SequelizeMock();

var DataMock = dbMock.define('data',{
  Activity: 'run',
  Weight: '50'
});
