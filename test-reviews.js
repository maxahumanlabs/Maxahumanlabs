require('dotenv').config({ path: '.env.local' });
const axios = require('axios');

async function testReviews() {
  const url = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL;
  const key = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const secret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  try {
    // Get all reviews to see if any have images
    const res = await axios.get(`${url}/wp-json/wc/v3/products/reviews`, {
      auth: { username: key, password: secret },
      params: { per_page: 5 }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.error(e.message);
  }
}

testReviews();
