const expect = require('chai').expect;
const superagent = require('superagent');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');
const fitjang = require('../fitjang.js')
const request = require('request');
const supertest = require('supertest');
const should  = require('should');
const chai = require('chai');


var server = supertest.agent("http://localhost:3000");

describe("Sample unit test", function(){
  it("should return 404", function(done){
    server
    .get("/random")
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  });

  it('Url homepage', function(done) {
    request.get({url : '/'},
      function(error, response){
          expect(200);
          done();
      });
    });

    it('Url show', function(done) {
      request.get({url : '/show'},
        function(error, response){
            expect(200);
            done();
        });
      });

  it("should return home page", function(done){
    server
    .post('/')
    .send({activity : "Run", weight : "50", time : "110"})
    .expect("Content-type",/json/)
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
});
