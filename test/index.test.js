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

  it("should return home page", function(done){
    server
    .post('/')
    .send({activity : "Run", weight : "50", time : "110"})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err, res){
      should(res.status).equal(200);
      // should(res.body.error).equal(false);
      // should(res.body).equal("Run");
      // res.status.should.equal(200);
      // res.body.error.should.equal(false);
      // res.body.data.should.equal(40);
      done();
    });
  });
});

describe('GET url', function(){
  it('Main page content', function(done) {
    request('http://localhost:3000' , function(error, response, body) {
        // expect(body).to.equal('<html><head><title>Fit Jang</title></head><body><h1>Fit Jang</h1><a href="/exercise">วิธีการออกกำลังกาย</a><br/><a href="/food">วิธีการกิน</a><br/><br/><form action="/" method="POST"><div><label for="activity">Activity :</label><select name="activity"><option value="Run">Run</option><option value="Jogging">Jogging</option></select></div><br/><div><label for="weight">Weight :</label><input name="weight"/></div><br/><div><label for="time">Time :</label><input name="time"/></div><br/><button type="submit">Submit</button></form></body></html>');
        done();
    });
  });
  it('Url homepage', function(done) {
    request.get({url : '/'},
      function(error, response, body){
          // var dataOb = JSON.parse(body);
          // expect(dataOb.activity).to.equal('Run');
          expect(200);
          console.log(body);
          done();
      });
    });
    it('Url show', function(done) {
      request.get({url : '/show'},
        function(error, response, body){
            // var dataOb = JSON.parse(body);
            // expect(dataOb.activity).to.equal('Run');
            expect(200);
            console.log(body);
            done();
        });
      });
});
