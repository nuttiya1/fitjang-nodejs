const expect = require('chai').expect;
const superagent = require('superagent');
const Sequelize = require('sequelize');
const sqlite = require('sqlite3');
const fitjang = require('../fitjang.js')
const request = require('request');


describe('First test', () => {
  it('Should assert true to be true', () => {
    expect(true).to.be.true;
  });
  it('Test homepage', function (done) {
    request.get({ url: '/' },
      function (error, response, body) {
        expect(200);
        done();
      });
  });
  it('Url show', function (done) {
    request.get({ url: '/show' },
      function (error, response, body) {
        expect(200);
        done();
      });
  });
});

