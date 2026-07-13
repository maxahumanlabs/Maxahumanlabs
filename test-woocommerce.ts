import { woocommerce } from './lib/woocommerce';

async function run() {
  try {
    const p = await woocommerce.getProductBySlug("retatrutide-15mg");
    console.log(p ? "FOUND: " + p.name : "NOT FOUND");
  } catch (e) {
    console.error(e);
  }
}
run();
