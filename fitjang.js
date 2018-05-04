const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');
const app = express();

var db = new Sequelize({
  dialect: 'sqlite',
  storage: 'fitjang.sqlite'
});

var Data = db.define('data', {
  Activity: Sequelize.STRING,
  Weight: Sequelize.INTEGER,
  Time: Sequelize.INTEGER,
  Calories: Sequelize.INTEGER
});

var Mets = db.define('Met', {
  Activity: Sequelize.STRING,
  Value: Sequelize.FLOAT,
});

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

app.get('/', function(req, res){
   res.render('homepage', {title : 'Fit Jang'});
});

app.post('/', function(req, res){
   var personInfo = req.body; //Get the parsed information
   if(!personInfo.activity || !personInfo.weight || !personInfo.time){
      res.send("Error");
   }
   else {

    var cal;

    db.sync().then(function () {
      Mets.find({
              where: {Activity:personInfo.activity} }).then(function (mets){
              console.log('Data mets value has been retrive ' + mets.Value + ' which is ' + personInfo.activity);
        cal = calculateCal(mets, personInfo);
        console.log(cal)
     }).then(function(){
        Data.create({
          Activity: personInfo.activity,
          Weight: personInfo.weight,
          Time: personInfo.time,
          Calories: cal
        }).then(function (latestData){
          console.log("Data has been added", latestData.id )
          app.get('/test', function(req, res){
            res.send(latestData);
          });
        }).then(function (){

          Data.findAll().then(function(data){
            res.render('show',{
              results: data
            });
          });
        });

      });
    });
  };
});

function calculateCal(mets, personInfo){
  return mets.Value*(personInfo.weight*personInfo.time)/60;
}
app.post('/deleteTable', function(req, res){

  var deleteId = req.body;
  console.log("delete id : " , deleteId);
  db.sync().then(function (){
    Data.findById(deleteId.id).then(function(data){
      data.destroy();
    });
    res.redirect('/show');
  });
});

app.get('/show', function(req, res){
  db.sync().then(function (){
    Data.findAll().then(function(data){
      res.render('show',{
        results: data
      });
    });
  });
});

app.use(express.static('public'));

app.get('/aboutme', function(req, res){
   res.render('aboutme');
});

app.get('/exercise', function(req, res){
   res.render('exercise');
});

app.get('/food', function(req, res){
   res.send("วิธีการกิน");
});

// app.get('/test', function(req, res){
//   db.sync().then(function () {
//     res.send(latestData);
//   });
// });

app.listen(3000);
module.exports = app;
