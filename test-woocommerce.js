const { woocommerce } = require('./lib/woocommerce');
require('dotenv').config({ path: '.env.local' });

async function run() {
  try {
    const p = await woocommerce.getProductBySlug("retatrutide-15mg");
    console.log(p ? "FOUND" : "NOT FOUND");
  } catch (e) {
    console.error(e);
  }
}
run();
