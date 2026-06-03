const express = require('express');
const router = express.Router();
const calculateForecast = require('../utils/calculateForecast');

router.post('/', (req, res) => {
  const { sales } = req.body;

  if (!Array.isArray(sales)) {
    return res.status(400).json({ error: "Sales must be an array" });
  }

  try {
    const forecast = calculateForecast(sales);
    res.json({ forecast });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
