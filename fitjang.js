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
   res.render('homepage');
});

app.post('/', function(req, res){
   var personInfo = req.body; //Get the parsed information
   console.log(personInfo);
   if(!personInfo.activity || !personInfo.weight || !personInfo.time){
      res.send("Error");
   }
   else {
    //  if(personInfo.activity == "run"){
    //    var met = 7};
    //  if(personInfo.activity == "jogging"){
    //    var met = 4.5};

    var cal;

    db.sync().then(function () {
      
      Mets.find({
        where: {Activity:personInfo.activity} }).then(function (mets){
        console.log('Data mets value has been retrive ' + mets.Value + ' which is ' + personInfo.activity);
        cal = mets.Value*(personInfo.weight*personInfo.time)/60;
        console.log(cal)
     }).then(function(){
       
        console.log(cal)
        Data.create({
          Activity: personInfo.activity,
          Weight: personInfo.weight,
          Time: personInfo.time,
          Calories: cal 
        }).then(function (latestData){
        
          console.log("Data has been added", latestData.id )
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

// app.get('/show', function(req, res){
//   res.render('show', {
//     message: Data.getAll()
//   })
  // db.Data.getAll().then(function(data){
  //   res.render('show',{
  //     message: data
  //   });
  // });
// });

app.post('/deleteTable', function(req, res){

  var deleteId = req.body;
  // res.send(deleteId.id)
  db.sync().then(function (){
    Data.findById( deleteId.id).then(function(data){
      console.log(data)
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

app.get('/exercise', function(req, res){
   res.render('exercise');
});

app.get('/food', function(req, res){
   res.send("วิธีการกิน");
});

app.listen(3000);
