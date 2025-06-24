const { createCanvas } = require('canvas');
const JsBarcode = require('jsbarcode');

module.exports = (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Missing code");
    return;
  }

  const canvas = createCanvas(600, 150);
  JsBarcode(canvas, code, {
    format: "CODE128",
    width: 3,
    height: 100,
    displayValue: false,
    background: "transparent",
    lineColor: "#000"
  });

  res.setHeader("Content-Type", "image/png");
  canvas.createPNGStream().pipe(res);
};
