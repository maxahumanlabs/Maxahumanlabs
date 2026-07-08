import fs from 'fs';
import path from 'path';

const firstNames = [
  "Mohamed", "Ahmed", "Mahmoud", "Khaled", "Youssef", "Omar", "Ali", "Hassan", "Hussein", "Ibrahim",
  "Mostafa", "Kareem", "Tarek", "Amr", "Mazen", "Ziad", "Yassin", "Seif", "Adham", "Nour",
  "Menna", "Rawan", "Salma", "Mariam", "Habiba", "Nadine", "Farah", "Laila", "Aisha", "Fatima",
  "Hana", "Maya", "Yara", "Reem", "Noha", "Dina", "Hadeer", "Esraa", "Aya", "Sara",
  "Mai", "Mona", "Nada", "Yasmin", "Hala", "Rana", "Sherif", "Walid", "Wael", "Sami",
  "Hisham", "Magdy", "Essam", "Emad", "Tamer", "Ayman", "Ehab", "Osama", "Bahaa", "Rami",
  "Shady", "Fady", "Kamal", "Gamal", "Salah", "Said", "Adel", "Ashraf", "Atef", "Talaat",
  "Ghada", "Rasha", "Marwa", "Eman", "Amira", "Dalia", "Riham", "Nermeen", "Heba", "Sahar",
  "Faten", "Mervat", "Nagwa", "Manal", "Samar", "Doaa", "Asmaa", "Shaimaa", "Hend", "Omnia",
  "Mohanad", "Marwan", "Bassam", "Bassel", "Faris", "Hazem", "Maged", "Waleed", "Saeed", "Farouk"
];

const lastInitials = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const lastNames = [
  "Hassan", "Ali", "Ibrahim", "Mohamed", "Ahmed", "Mahmoud", "Tarek", "Saeed",
  "Fouad", "Youssef", "Kamal", "Osama", "Gaber", "Farouk", "Zaki", "Salem",
  "Talaat", "Adel", "Amin", "Mansour", "El-Sayed", "Mostafa", "Sami", "Ramzy",
  "Al-Qahtani", "Al-Otaibi", "Al-Dossari", "Al-Mutairi", "Al-Subaie", "Al-Shammari", 
  "Al-Harbi", "Al-Ghamdi", "Al-Zahrani", "Al-Shehri", "Al-Enezi", "Al-Hajri",
  "Al-Rashidi", "Al-Juhani", "Al-Malki", "Al-Asmari", "Al-Qarni", "Al-Saud",
  "Al-Sabah", "Al-Maktoum", "Al-Nahyan", "Al-Thani", "Al-Khalifa", "Al-Futtaim",
  "Al-Ghurair", "Al-Majed", "Al-Rashed", "Al-Suwaidi", "Al-Marri", "Al-Naimi",
  "Al-Kuwari", "Al-Sulaiti", "Al-Khater", "Al-Binali", "Al-Fardan", "Al-Zayani",
  "Al-Moayed", "Al-Mulla", "Al-Shirawi", "Al-Rostamani", "Al-Tayer", "Al-Habtoor",
  "Al-Olayan", "Al-Rajhi", "Al-Futtaim", "Al-Shaya", "Al-Kharafi", "Al-Ghanim"
];

const reviewTexts = [
  "That biggest change for me was recovery after heavy training days. This worked fine with my weekday routine.",
  "I'd put this in the better-order category. My sleep quality was better than expected.",
  "I liked the clear markings. It helped me feel more recovered without changing the rest of my routine. Batch info made the order feel more serious. I'm picky with this kind of thing and this one felt right.",
  "I personally can see why it gets repeat orders. For me, the biggest change for me was recovery after heavy training days. I'd order it again.",
  "My sleep quality was better than expected. Batch info was easy to check.",
  "The sleep quality change was the biggest surprise. Clothes told the story more than photos for me.",
  "It didn't feel dramatic, just a steady improvement in rest and recovery. Everything was clearly marked and not confusing. This was easy to keep track of the schedule.",
  "My evenings felt calmer and I was falling asleep easier. It worked best when I stayed consistent. Packaging and vial quality were dependable.",
  "Worth trying for me. I was getting through workouts without feeling as beaten up afterward. It felt cleaner than most of what I'm used to.",
  "For me, the biggest change for me was recovery after heavy training days. The vials and packaging both felt solid. For me, consistency was the key.",
  "For me, i'm glad I gave it a shot. That order looked clean from the moment I opened the box. The first thing I picked up on was waking up less stiff.",
  "For me, it was simple to keep going with. The basics still mattered, which is fair.",
  "Clear markings made it easy. I was getting through workouts without feeling as beaten up afterward. Reconstitution was straightforward and clean.",
  "For me, the biggest change for me was recovery after heavy training days. This worked fine with my weekday routine.",
  "For me, quality was what I hoped for. The vials looked consistent.",
  "It helped me feel more recovered without changing the rest of my routine. Consistency mattered more than rushing it. I wish the label was a tiny bit larger, but the product itself was good.",
  "The clean packaging stood out because I've had bad ones elsewhere. I felt more refreshed even when my schedule was messy.",
  "Seal, label, storage, batch check, all handled well. Labels were easy to read, and the QR code worked.",
  "Pretty impressed overall. The pack was organized, which stood out. The labels made storage straightforward.",
  "The quality seemed right to me. The first thing I picked up on was waking up less stiff.",
  "Amazing quality and fast shipping. I've noticed a significant difference in my recovery time since starting this regimen.",
  "Customer service was exceptional. The product speaks for itself, truly top-tier quality that I haven't found elsewhere.",
  "I was skeptical at first, but the results over the past month have been undeniable. Highly recommended for anyone serious about their routine.",
  "Simple, effective, and reliable. That's all I ask for, and this delivers every single time.",
  "The peace of mind knowing the purity is tested is worth the price alone. Very happy with my purchase.",
  "A total game changer for my daily routine. The quality is noticeably better than other brands I've tried.",
  "Fast shipping and secure packaging. Everything arrived in perfect condition. Will buy again.",
  "This is exactly what I was looking for. No weird fillers, just pure quality. Highly recommended.",
  "My energy levels feel so much more balanced now. It's subtle but makes a huge difference throughout the week.",
  "Great product, great price. I've been a returning customer for 3 months now and have never been disappointed.",
  "I don't usually leave reviews, but this product actually lived up to the hype. Very solid results.",
  "The purity of this batch was excellent. Reconstitution was a breeze, completely clear.",
  "I appreciate the detailed lab reports. It builds a lot of trust. Product performs exactly as expected.",
  "I've shared this with my training partner and we both agree it's top notch. Really helps with post-workout fatigue.",
  "No complaints at all. The order arrived quickly and the quality is exactly what was advertised.",
  "I was hesitant about the price, but you definitely get what you pay for. Premium quality all the way.",
  "Everything was sterile and well-packaged. The customer support team was also very quick to answer my questions.",
  "I've tried a few alternatives, but I keep coming back to this one. It's just more consistent.",
  "Very clean product. I haven't experienced any of the minor side effects I used to get from cheaper alternatives.",
  "The vials are sturdy and the stoppers are good quality. Small details matter and they nailed it.",
  "Noticeable improvements in joint mobility after a couple of weeks. Very satisfied.",
  "It's refreshing to find a company that actually delivers on its promises. Will definitely be ordering more.",
  "The results speak for themselves. My recovery metrics have improved across the board since I started.",
  "If you're on the fence, just try it. It's been a staple in my regimen for months now.",
  "Excellent value for the quality you receive. Shipping was discreet and very fast.",
  "I love how transparent the company is about their testing process. It really makes a difference.",
  "Smooth transaction from start to finish. The product is pure and effective.",
  "This has become an essential part of my wellness routine. I can't imagine going without it now.",
  "The packaging was very professional. It's clear they care about their product and their customers.",
  "I've been using this for a few weeks and the results are already better than what I got from my previous supplier in months."
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate() {
  const start = new Date(2025, 0, 1);
  const end = new Date(2026, 6, 1);
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const reviews = [];

for (let i = 1; i <= 1000; i++) {
  const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
  
  // Randomize name format:
  // 0: FirstName L. (e.g., Sara D.)
  // 1: FirstName LastName (e.g., Hossam Hassan)
  // 2: FirstName (e.g., Rawan)
  const nameFormatType = getRandomInt(0, 2);
  let name = firstName;
  
  if (nameFormatType === 0) {
    const lastInitial = lastInitials[getRandomInt(0, lastInitials.length - 1)];
    name = `${firstName} ${lastInitial}.`;
  } else if (nameFormatType === 1) {
    const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
    name = `${firstName} ${lastName}`;
  }
  
  const text = reviewTexts[getRandomInt(0, reviewTexts.length - 1)];
  
  reviews.push({
    id: i,
    name,
    date: getRandomDate(),
    rating: 5,
    text,
    verified: true
  });
}

// Sort by date descending (rough sort by parsing year/month/day)
reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

const outputPath = path.join(process.cwd(), 'public', 'data', 'static-reviews.json');

fs.writeFileSync(outputPath, JSON.stringify(reviews, null, 2));

console.log(`Successfully generated ${reviews.length} static reviews at ${outputPath}`);
