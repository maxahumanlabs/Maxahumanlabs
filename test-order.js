const axios = require('axios');
const baseURL = 'https://slategrey-zebra-234644.hostingersite.com';
async function test() {
  try {
    const res = await axios.get(`${baseURL}/wp-json/wc/store/v1/products?orderby=menu_order&order=asc`);
    console.log("Ordered products:", res.data.map(p => p.name));
  } catch (e) {
    console.log("Error:", e.response?.data || e.message);
  }
}
test();
