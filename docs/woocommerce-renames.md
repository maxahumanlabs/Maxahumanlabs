# WooCommerce — Product Naming, Slugs & 301 Action List

Source: **BYND // MAXA — Product Naming** + **Tickets** (SEO vendor).
These changes live in **WordPress / WooCommerce** (product name + slug), not in the Next.js code.

**How to use:** for each product, update the **Name** and (where noted) the **Slug** in WooCommerce → Products. After any **slug** change, tell the dev to add the matching **301 redirect** in code (`old → new`) so existing links / shares keep working.

**Decision (owner):** Reta → use **"Retatrutide (Reta)"** in the name + slug `retatrutide-*`, with 301 from the old `reta-*` slug.

Legend — 301: **Yes** = slug changes, redirect required · **No** = slug stays · **Maybe** = confirm current WP slug first.

---

## 🔴 Priority 1 — Remove legal / health-claim wording (UAE/KSA risk) — do first
| Current name | New name (EN) | New name (AR) | Slug | 301 |
|---|---|---|---|---|
| MAXA TEST – Advanced Natural **TRT** Testosterone Complex (90 Caps) | MAXA TEST — Natural Testosterone Support Complex (90 Capsules) | ماكسا تيست — مركب دعم التستوستيرون الطبيعي (90 كبسولة) | `maxa-test-testosterone-complex-90-capsules` | **Yes** |
| Tesamorelin 10mg **(GH Secreting & Visceral Fat Loss)** | Tesamorelin 10mg — Research Vial \| GH-Releasing Research | تيزامورلين 10 ملغ — قارورة بحثية \| أبحاث إفراز هرمون النمو | `tesamorelin-10mg` | Maybe |
| Yohimbine HCL (2.5mg) … **Fat Targeting Complex** | Yohimbine HCl 2.5mg (60 Capsules) — Alpha-2 Receptor Research | يوهيمبين إتش سي إل 2.5 ملغ (60 كبسولة) — أبحاث مستقبلات ألفا-2 | `yohimbine-hcl-2-5mg-60-capsules` | **Yes** |

---

## 🔁 Priority 2 — Slug changes that NEED a 301 (ping dev after)
| Old slug | New slug | New name |
|---|---|---|
| `tb-500-10mg-bpc-157-10mg-wolverine-stack` | `wolverine-stack-injectable` | Wolverine Stack — TB-500 10mg + BPC-157 10mg Injectable Vials |
| *(Wolverine capsules current slug)* | `wolverine-oral-bpc157-tb500-60-capsules` | Wolverine Oral — BPC-157 + TB-500 Recovery Capsules (60 Caps) |
| `reta-12mg-pen` | `retatrutide-12mg-pen` | Retatrutide (Reta) 12mg — Pre-filled Research Pen |
| `reta-15mg` | `retatrutide-15mg` | Retatrutide (Reta) 15mg — Research Vial |

---

## Full list — all 30 products

### Injectables / vials
| # | Current | New name (EN) | New name (AR) | Slug | 301 |
|---|---|---|---|---|---|
| 1 | GHK-Cu 50mg | GHK-Cu 50mg — Research Vial \| Skin & Collagen Support | جي إتش كي-سي يو 50 ملغ — قارورة بحثية \| دعم البشرة والكولاجين | `ghk-cu-50mg` | No |
| 2 | MOTS-c 10mg | MOTS-c 10mg — Research Vial \| Mitochondrial & Metabolic Support | موتس-سي 10 ملغ — قارورة بحثية \| دعم الطاقة الخلوية والتمثيل الغذائي | `mots-c-10mg` | No |
| 3 | BPC-157 10mg | BPC-157 10mg — Research Vial \| Tissue & Recovery | بي بي سي-157 10 ملغ — قارورة بحثية \| استرداد الأنسجة | `bpc-157-10mg` | Maybe |
| 4 | TB-500 + BPC-157 (Wolverine Stack) | Wolverine Stack — TB-500 10mg + BPC-157 10mg Injectable Vials | ستاك ولفرين — TB-500 10 ملغ + BPC-157 10 ملغ \| قوارير حقن بحثية | `wolverine-stack-injectable` | **Yes** |
| 5 | Glow Stack (GHK-Cu+TB500+BPC-157) | Glow Stack — GHK-Cu + TB-500 + BPC-157 \| Skin & Recovery Research Bundle | ستاك جلو — GHK-Cu + TB-500 + BPC-157 \| مجموعة البشرة والتعافي | `glow-stack-ghk-cu-tb500-bpc157` | Maybe |
| 6 | Reta 12mg PEN | Retatrutide (Reta) 12mg — Pre-filled Research Pen | ريتاتروتايد (ريتا) 12 ملغ — قلم بحثي جاهز للاستخدام | `retatrutide-12mg-pen` | **Yes** |
| 7 | Reta 15mg | Retatrutide (Reta) 15mg — Research Vial | ريتاتروتايد (ريتا) 15 ملغ — قارورة بحثية | `retatrutide-15mg` | **Yes** |
| 8 | Kisspeptin 10mg | Kisspeptin 10mg — Research Vial \| Hormonal Axis Research | كيسبيبتين 10 ملغ — قارورة بحثية \| أبحاث المحور الهرموني | `kisspeptin-10mg` | No |
| 9 | Epithalon 10mg | Epithalon 10mg — Research Vial \| Anti-Aging & Telomere Research | إيبيثالون 10 ملغ — قارورة بحثية \| أبحاث مضادة للشيخوخة والتيلومير | `epithalon-10mg` | No |
| 10 | AOD-9604 5mg | AOD-9604 5mg — Research Vial \| Metabolic & Lipolysis Research | AOD-9604 5 ملغ — قارورة بحثية \| أبحاث التمثيل الغذائي | `aod-9604-5mg` | No |
| 15 | IGF-1 LR3 10mg — Muscle & Recovery… | IGF-1 LR3 10mg — Research Vial \| Tissue Signaling Research | IGF-1 LR3 10 ملغ — قارورة بحثية \| أبحاث الإشارات الخلوية | `igf-1-lr3-10mg` | No |
| 16 | KPV 10mg — Inflammation Balance… | KPV 10mg — Research Vial \| Inflammation & Gut Research | KPV 10 ملغ — قارورة بحثية \| أبحاث الالتهاب والأمعاء | `kpv-10mg` | No |
| 17 | PT-141 10mg | PT-141 10mg — Research Vial \| Melanocortin Research | PT-141 10 ملغ — قارورة بحثية \| أبحاث الميلانوكورتين | `pt-141-10mg` | No |
| 18 | SS-31 10mg — Mitochondrial Repair… | SS-31 10mg — Research Vial \| Mitochondrial Research | SS-31 10 ملغ — قارورة بحثية \| أبحاث الميتوكوندريا | `ss-31-10mg` | No |
| 19 | Tesamorelin 10mg (GH Secreting…) | Tesamorelin 10mg — Research Vial \| GH-Releasing Research | تيزامورلين 10 ملغ — قارورة بحثية \| أبحاث إفراز هرمون النمو | `tesamorelin-10mg` | Maybe |
| 20 | SLU-PP-332 (injectable) | SLU-PP-332 250mcg — Research Vial \| Exercise Mimetic Research | إس إل يو-بي بي-332 250 ميكروجرام — قارورة بحثية | `slu-pp-332-250mcg-vial` | Maybe |
| 21 | CJC 5mg/Ipamorelin 5mg (Muscle…) | CJC-1295 5mg + Ipamorelin 5mg — Research Stack Vials | CJC-1295 5 ملغ + إيبامورلين 5 ملغ — قوارير بحثية | `cjc-1295-ipamorelin-stack-5mg` | Maybe |

### Nasal sprays
| # | Current | New name (EN) | New name (AR) | Slug | 301 |
|---|---|---|---|---|---|
| 11 | DSIP 10mg — Sleep Depth + Recovery (100mcg/puff) | DSIP 10mg Nasal Spray — Sleep & Recovery Research Peptide | DSIP 10 ملغ بخاخ أنفي — ببتيد النوم والاستشفاء البحثي | `dsip-10mg-nasal-spray` | Maybe |
| 12 | Selank 10mg Nasal Spray — Calm Focus… | Selank 10mg Nasal Spray — Calm Focus Research Peptide | سيلانك 10 ملغ بخاخ أنفي — ببتيد التركيز الهادئ البحثي | `selank-10mg-nasal-spray` | Maybe |
| 13 | Semax 10mg Nasal Spray — Focus… | Semax 10mg Nasal Spray — Cognitive Focus Research Peptide | سيماكس 10 ملغ بخاخ أنفي — ببتيد التركيز الإدراكي البحثي | `semax-10mg-nasal-spray` | Maybe |
| 14 | NAD+ 500mg Spray — Cellular Energy… (Research) | NAD+ 500mg Nasal Spray — Cellular Energy Research | NAD+ 500 ملغ بخاخ أنفي — أبحاث الطاقة الخلوية | `nad-plus-500mg-spray` | Maybe |

### Capsules / supplements
| # | Current | New name (EN) | New name (AR) | Slug | 301 |
|---|---|---|---|---|---|
| 22 | BPC-157 (1000 mcg) 60 capsules | BPC-157 1000mcg (60 Capsules) — Oral Research Supplement | بي بي سي-157 1000 ميكروجرام (60 كبسولة) — مكمل بحثي فموي | `bpc-157-1000mcg-60-capsules` | Maybe |
| 23 | MAXA GLP1 Peptide Mix (2mg) 60 Caps | MAXA GLP-1 Peptide Blend 2mg (60 Capsules) — Weight Research | ماكسا مزيج جي إل بي-1 2 ملغ (60 كبسولة) — أبحاث إدارة الوزن | `maxa-glp1-peptide-blend-2mg-60-capsules` | No |
| 24 | GLOW GHK-cu (5mg) 60 Caps | GLOW — GHK-Cu 5mg (60 Capsules) \| Skin Research Supplement | جلو — GHK-Cu 5 ملغ (60 كبسولة) \| مكمل أبحاث البشرة | `glow-ghk-cu-5mg-60-capsules` | Maybe |
| 25 | MAXA TEST – Advanced Natural TRT… (90) | MAXA TEST — Natural Testosterone Support Complex (90 Capsules) | ماكسا تيست — مركب دعم التستوستيرون الطبيعي (90 كبسولة) | `maxa-test-testosterone-complex-90-capsules` | **Yes** |
| 26 | Methylene Blue (10mg) 60 Caps — Mito… Formula | Methylene Blue 10mg (60 Capsules) — Mitochondrial Research | ميثيلين بلو 10 ملغ (60 كبسولة) — أبحاث الميتوكوندريا | `methylene-blue-10mg-60-capsules` | Maybe |
| 27 | SLU-PP-332 (250 mcg) 60 Capsules | SLU-PP-332 250mcg (60 Capsules) — Oral Exercise Mimetic Research | إس إل يو-بي بي-332 250 ميكروجرام (60 كبسولة) — أبحاث فموية | `slu-pp-332-250mcg-60-capsules` | No |
| 28 | Wolverine (BPC-157 1000mcg + TB500 1250mcg) 60 Caps | Wolverine Oral — BPC-157 + TB-500 Recovery Capsules (60 Caps) | ولفرين أورال — كبسولات BPC-157 + TB-500 للاستشفاء (60 كبسولة) | `wolverine-oral-bpc157-tb500-60-capsules` | **Yes** |
| 29 | Yohimbine HCL (2.5mg) 60 Caps — Fat Targeting… | Yohimbine HCl 2.5mg (60 Capsules) — Alpha-2 Receptor Research | يوهيمبين إتش سي إل 2.5 ملغ (60 كبسولة) — أبحاث مستقبلات ألفا-2 | `yohimbine-hcl-2-5mg-60-capsules` | **Yes** |
| 30 | RetaPill 2mg (60 Capsules) | RetaPill — Oral Retatrutide (Reta) 2mg (60 Capsules) \| Research | ريتابيل — ريتاتروتايد (ريتا) فموي 2 ملغ (60 كبسولة) \| بحثي | `retatrutide-pill-2mg-60-capsules` | Maybe |

---

## Standardization rules (apply across the catalogue)
- Add the **delivery format** to every name: `— Research Vial` / `Nasal Spray` / `(60 Capsules)`.
- Move dosing details like `(100mcg / puff)` **out of the name** into the description.
- Remove benefit/claim subtitles ("Sleep / Recovery / Focus / Fat … Support") — keep research-framed wording only.
- Fix casing/units: **GLP1 → GLP-1**, **GHK-cu → GHK-Cu**; standardise BPC-157 units (vial `10mg` vs capsule `1000mcg`).
- Keep the brand short-forms (Glow, Wolverine, RetaPill, Reta) **inside** the name, but always include the full compound for search.

## After WooCommerce changes
Ping the dev with the final **old → new slug** pairs; the matching **301 redirects** will be added in `next.config` (they must not be activated before the slugs actually change, or the new URLs 404).
