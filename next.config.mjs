/** @type {import('next').NextConfig} */

// 301 redirects: old product slugs (from WooCommerce `_wp_old_slug`) -> new slugs.
// Old Arabic content was a client-side toggle on the same English URL, so only the
// non-prefixed /products/<old> URLs were ever public/indexable.
const PRODUCT_SLUG_REDIRECTS = {
  // capsules / supplements
  'slu-pp-332-250-mcg-60-capsules': 'slu-pp-332-250mcg-60-capsules',
  'maxa-test-advanced-natural-trt-testosterone-complex-90-capsules': 'maxa-test-testosterone-complex-90-capsules',
  'maxa-test-natural-testosterone-support-complex-90-capsules': 'maxa-test-testosterone-complex-90-capsules',
  'methylene-blue-10mg-60-capsules-mitochondrial-health-brain-energy-formula': 'methylene-blue-10mg-60-capsules',
  'maxa-glp1-peptide-mix-2mg-60-capsules': 'maxa-glp1-peptide-blend-2mg-60-capsules',
  'wolverine-bpc-157-1000mcg-tb500-1250mcg-60-capsules': 'wolverine-oral-bpc157-tb500-60-capsules',
  'bpc-157-1000-mcg-60-capsules': 'bpc-157-1000mcg-60-capsules',
  'yohimbine-hcl-2-5mg-60-capsules-alpha-receptor-fat-targeting-complex': 'yohimbine-hcl-2-5mg-60-capsules',
  // injectable vials
  'ghk-cu-50mg-skin-repair-collagen-support': 'ghk-cu-50mg',
  'mots-c-10mg-metabolic-boost-energy': 'mots-c-10mg',
  'bpc-157-10mg-tissue-repair-recovery': 'bpc-157-10mg',
  'ss-31-10mg-mitochondrial-repair-energy-support': 'ss-31-10mg',
  'kpv-10mg-inflammation-balance-gut-skin-support': 'kpv-10mg',
  'igf-1-lr3-10mg-muscle-recovery-signaling-support': 'igf-1-lr3-10mg',
  'pinealon-10mg-neuroprotection-cognitive-resilience-support': 'pinealon-10mg',
  'aod-9604-5mg-fat-metabolism-lipolysis-support': 'aod-9604-5mg',
  'tesamorelin-10mg-gh-secreting-visceral-fat-loss': 'tesamorelin-10mg',
  'kisspeptin-10mg-testosterone-boost': 'kisspeptin-10mg',
  'cjc-1295-ipamorelin-10mg-gh-signaling-muscle-recovery-support': 'cjc-1295-ipamorelin-10mg',
  'ret-15mg-retatrutide-peptide': 'retatrutide-15mg',
  'ret-15mg-%d8%a8%d9%8a%d8%a8%d8%aa%d8%a7%d9%8a%d8%af-%d8%a7%d9%84%d8%b1%d9%8a%d8%aa%d8%a7': 'retatrutide-15mg',
  // vial variants of spray peptides
  'nad-500mg-cellular-energy-repair-support': 'nad-plus-500mg-vial',
  'semax-10mg-focus-cognitive-support': 'semax-10mg-vial',
  'selank-10mg-calm-focus-stress-support': 'selank-10mg-vial',
  'dsip10mg-sleep-quality-recovery-support': 'dsip-10mg-vial',
  // nasal sprays
  'dsip-10mg-sleep-depth-recovery-support-100mcg-puff': 'dsip-10mg-nasal-spray',
  'selank-10mg-nasal-spray-calm-focus-stress-support-100mcg-puff': 'selank-10mg-nasal-spray',
  'semax-10mg-nasal-spray-focus-mental-clarity-support-100mcg-puff': 'semax-10mg-nasal-spray',
  'nad-500mg-spray-cellular-energy-recovery-support-research': 'nad-plus-500mg-nasal-spray',
  // stacks
  'tb-500-bpc-157-10mg-wolverine-stack': 'wolverine-stack-injectable',
  'tb-500-10mg-bpc-157-10mg-wolverine-stack': 'wolverine-stack-injectable',
  'glow-ghk-cu-50mg-tb500-10mg-bpc-157-10mg-skin-hair-regeneration': 'glow-stack-ghk-cu-tb500-bpc157',
  'performance-stack-mots-c-bpc157-tb500': 'performance-stack-motsc-bpc157-tb500',
  'rapid-fat-loss-stack-ret-15mg-mots-c-10mg-cjc-5mg-ipa-5mg': 'retatrutide-motsc-cjc-ipamorelin-stack',
  'hollywood-celebrity-stack-ret-15mg-glow-70mg-mots-c-10mg': 'hollywood-stack-retatrutide-glow-motsc',
  'muscle-build-fat-loss-stack-ret-15mg-cjc-5mg-ipa-5mg-bpc-157-10mg-tb500-10mg': 'retatrutide-cjc-ipamorelin-bpc157-tb500-stack',
  '%d8%b3%d8%aa%d8%a7%d9%83-%d8%a7%d9%84%d8%af%d9%87%d9%88%d9%86-%d8%a7%d9%84%d8%b9%d9%86%d9%8a%d8%af%d8%a9-stubborn-fat-stack-rt-15mg-aod9604-5mg-motsc-10mg': 'retatrutide-aod-9604-motsc-stack',
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'maxahuman.local',
      },
      {
        protocol: 'https',
        hostname: 'maxahuman.local',
      },
    ],
  },
  async redirects() {
    return Object.entries(PRODUCT_SLUG_REDIRECTS).map(([from, to]) => ({
      source: `/products/${from}`,
      destination: `/products/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
