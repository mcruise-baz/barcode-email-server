import bwipjs from 'bwip-js';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    res.status(400).send("Missing 'code' parameter");
    return;
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid:        'code128',
      text:        code,
      scale:       3,
      height:      10,
      includetext: false,
      backgroundcolor: 'ffab01', // Transparent
    });

    res.setHeader('Content-Type', 'image/png');
    res.send(png);
  } catch (err) {
    res.status(500).send('Barcode generation failed');
  }
}
