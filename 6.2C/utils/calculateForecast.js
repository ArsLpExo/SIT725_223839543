function calculateForecast(sales) {
  if (!Array.isArray(sales) || sales.length === 0) {
    throw new Error("Sales array cannot be empty");
  }

  if (sales.some(n => typeof n !== "number" || isNaN(n))) {
    throw new Error("Sales array must contain only numbers");
  }

  // Simple Moving Average of last 3 values
  const lastThree = sales.slice(-3);
  const sum = lastThree.reduce((a, b) => a + b, 0);
  return Math.round(sum / lastThree.length);
}

module.exports = calculateForecast;
