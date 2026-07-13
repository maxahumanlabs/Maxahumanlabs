const QRCode = require('qrcode');

async function generate() {
  await QRCode.toFile('/Users/Seif/Desktop/Maxa_Human_Authentication_QR.png', 'https://www.maxahumanlabs.com/pages/instant-authentication', {
    width: 500,
    margin: 2
  });
  console.log("Maxa QR generated");

  await QRCode.toFile('/Users/Seif/Desktop/Peptive_Authentication_QR.png', 'https://www.peptivepeptides.com/pages/instant-authentication', {
    width: 500,
    margin: 2
  });
  console.log("Peptive QR generated");
}

generate().catch(console.error);
