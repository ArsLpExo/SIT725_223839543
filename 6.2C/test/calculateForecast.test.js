const chai = require('chai');
const expect = chai.expect;
const calculateForecast = require('../utils/calculateForecast');

describe('calculateForecast Function', () => {

  it('should calculate the correct forecast for valid sales data', () => {
    const result = calculateForecast([100, 120, 130, 150]);
    expect(result).to.equal(133);
  });

  it('should throw an error for empty array', () => {
    expect(() => calculateForecast([])).to.throw("Sales array cannot be empty");
  });

  it('should throw an error for non-numeric values', () => {
    expect(() => calculateForecast([100, "abc", 200]))
      .to.throw("Sales array must contain only numbers");
  });

});
