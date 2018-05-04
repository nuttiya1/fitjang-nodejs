const expect = require('chai').expect;
const superagent = require('superagent');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');
const fitjang = require('../fitjang.js')
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
    .send({activity : "Run", weight : "50", time : "50"})
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
  it("should delete data", function(done, request){
    server
    .post('/deleteTable')
    .send({id : "331"})
    .expect(200)
    .end(function(err, res){
      done();
    });
  });
});

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
