const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');

chai.use(chaiHttp);

describe('POST /api/forecast', () => {

  it('should return forecast for valid sales array', (done) => {
    chai.request(app)
      .post('/api/forecast')
      .send({ sales: [100, 120, 130, 150] })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.forecast).to.equal(133);
        done();
      });
  });

  it('should return error for non-array input', (done) => {
    chai.request(app)
      .post('/api/forecast')
      .send({ sales: "hello" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.equal("Sales must be an array");
        done();
      });
  });

});
