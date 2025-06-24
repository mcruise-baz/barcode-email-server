const { SVG, registerWindow } = require('@svgdotjs/svg.js');
const { createSVGWindow } = require('svgdom');
const JsBarcode = require('jsbarcode');

module.exports = (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Missing 'code' parameter");
    return;
  }

  // Setup SVG window & document for JsBarcode to render into
  const window = createSVGWindow();
  const document = window.document;
  registerWindow(window, document);

  const draw = SVG(document.documentElement);

  // Create an SVG element 600x150
  const svg = draw.size(600, 150);

  // Generate barcode on the SVG element
  JsBarcode(svg.node, code, {
    format: "CODE128",
    displayValue: false,
    background: "none",
    lineColor: "#000",
    width: 3,
    height: 100,
    margin: 0,
  });

  // Output SVG string
  const svgString = svg.svg();

  // Return SVG with correct content-type header
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svgString);
};
