const expect = require('chai').expect;
// const superagent = require('superagent');
// const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
var file = "fitjang.sqlite";
var db = new sqlite3.Database(file);
const request = require('request');
const supertest = require('supertest');
const should  = require('should');
const chai = require('chai');

var path = require("path");
var models = require(path.join(__dirname, "../"));

var server = supertest.agent("http://localhost:3000");

describe("Test about add and delete data", function(){
  it("should return home page", function(done){
    server
    .post('/')
    .send({activity : "Run", weight : "60", time : "100"})
    .expect(200)
    .end(function(err, res){
      should(res.status).equal(200);
      done();
    });
  });
  it("should add null data", function(done){
    server
    .post('/')
    .send({activity : null, weight : null, time : null})
    .expect(200)
    .end(function(err, res, body){
      should(res.text).equal("Error");
      should(res.status).equal(200);
      done();
      });
    });

  it("should return new data", function(done){
    server
    .get('/test')
    .expect(200)
    .end(function(err, res){
      should(res.status).equal(200);
      console.log(res.text);
      done();
    });
  });
  // it("should delete data", function(done, request){
  //   server
  //   .post('/deleteTable')
  //   .send({id : "357"})
  //   .expect(200)
  //   .end(function(err, res){
  //     done();
  //   });
  // });
});

describe('Test with Database', function(){
  it("data exist in Database", function(done){
    server.get('/test')
    .expect(200)
    .end(function(err, res){

      // Parse the response text into json
      var obj = JSON.parse(res.text);
      db.all("select * from data where id="+obj.id, function(err, rows){
        rows.forEach(function(row){
          console.log(row.Activity, row.Weight, row.id);
          
          // Assertion id from DB with text from "/test"
          should(obj.id).equal(row.id);
          db.close();
          done();
        })
      })
    })
  })

  // it("data should not exist in Database (because we want to delete)", function (){
    
  //   server.post('/deleteTable')
  //   .send({id : sendID()})
  //   .expect(200)
  //   .end(function(err, res){
  //     done();
  //   })
  // })
})

describe('GET url', function(){
  it("url homepage", function(done) {
    request.get({url : '/'},
      function(error, response, body){
          expect(200);
          done();
      });
    });
  it("url show", function(done) {
    request.get({url : '/show'},
      function(error, response, body){
          expect(200);
          done();
      });
    });
  it("url test", function(done) {
      request.get({url : '/test'},
        function(error, response, body){
            expect(200);
            done();
        });
    });
});

function sendID(callback){
  db.all("select max(id) from data", function(err, rows, callback){
      console.log(rows);
      rows.forEach(function(row){
        return callback(row.id);
      })
  })
}