const fs = require('fs');

const reviewsPath = '/Users/Seif/Documents/Maxa Human/Maxa Human/public/data/static-reviews.json';
const reviews = JSON.parse(fs.readFileSync(reviewsPath, 'utf8'));

// Find max ID to assign new IDs
let maxId = 0;
reviews.forEach(r => {
  if (r.id > maxId) maxId = r.id;
});

const newReviews = [
  {
    id: maxId + 1,
    name: "Ahmed T.",
    date: "10/7/2026",
    rating: 5,
    text: "I've been using this peptide for a few weeks now. The results are absolutely amazing, I've noticed a huge difference in my physical shape and my joint pain has completely disappeared. Highly recommend!",
    verified: true,
    images: ["/Reviews/AOD.jpeg"]
  },
  {
    id: maxId + 2,
    name: "Sarah M.",
    date: "8/7/2026",
    rating: 5,
    text: "The quality of these peptides is unmatched. I feel younger, my sleep is deeper, and my overall energy levels have skyrocketed. Will definitely be ordering my next batch soon.",
    verified: true,
    images: ["/Reviews/Epithalon.jpeg"]
  },
  {
    id: maxId + 3,
    name: "Omar K.",
    date: "5/7/2026",
    rating: 5,
    text: "Top notch quality! I've seen incredible improvements in my recovery time after workouts and my overall appearance. The purity is exactly as advertised. Thank you Maxa Human!",
    verified: true,
    images: ["/Reviews/Ghk-cu.jpeg"]
  },
  {
    id: maxId + 4,
    name: "Hassan",
    date: "1/7/2026",
    rating: 5,
    text: "I was skeptical at first, but the effectiveness is undeniable. It worked exactly as described and the results were very fast. The customer service team was also very helpful with my questions.",
    verified: true,
    images: ["/Reviews/PT-141.jpeg"]
  },
  {
    id: maxId + 5,
    name: "Youssef Ali",
    date: "28/6/2026",
    rating: 5,
    text: "My package arrived very quickly and in perfect condition. The packaging is very professional and you can tell they care about maintaining the quality of the peptides during shipping. 10/10.",
    verified: true,
    images: ["/Reviews/Package.jpeg"]
  },
  {
    id: maxId + 6,
    name: "Rania",
    date: "25/6/2026",
    rating: 5,
    text: "This has been a game changer for my fitness goals. My appetite is controlled and my energy is steady throughout the day. Definitely the highest quality peptide I've tried so far.",
    verified: true,
    images: ["/Reviews/Reta.jpeg"]
  },
  {
    id: maxId + 7,
    name: "Mohamed S.",
    date: "20/6/2026",
    rating: 5,
    text: "The results are mind-blowing. My recovery time is cut in half and I don't feel fatigued anymore. You can literally feel the quality of the product working in your system.",
    verified: true,
    images: ["/Reviews/SS-31.jpeg"]
  }
];

// Add new reviews at the beginning of the array so they show up first
const updatedReviews = [...newReviews, ...reviews];

fs.writeFileSync(reviewsPath, JSON.stringify(updatedReviews, null, 2));
console.log('Added 7 new reviews with images successfully.');
