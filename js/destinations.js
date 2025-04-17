/**
 * Bali 3D Explorer - Destinations Data
 * Contains information about all tourist destinations in Bali
 */

const destinations = [
  // Featured Attractions
  {
    id: "sakala-resort",
    name: "Sakala Resort Bali",
    category: "featured",
    coordinates: [115.2188608, -8.7593706], // Sakala Resort Bali (Tanjung Benoa) - CORRECT
    description: "The Sakala Resort Bali is a 5-star luxury resort located in Tanjung Benoa, offering spacious suites and private villas that blend modern contemporary design with traditional Balinese elements.",
    drivingTime: "Starting point",
    distance: "0 km",
    operatingHours: "24/7 for guests",
    pricing: {
      rooms: "Starting from IDR 2,500,000/night",
      dining: "Various options available"
    },
    specialEvents: [
      { 
        name: "Balinese Cooking Class", 
        schedule: "Every Tuesday and Thursday, 10:00 AM",
        price: "IDR 350,000/person"
      },
      { 
        name: "Afternoon Tea by the Sea", 
        schedule: "Daily, 2:00 PM - 5:00 PM",
        price: "IDR 150,000/person"
      }
    ],
    features: ["Luxury suites", "Beachfront access", "Fine dining", "Spa services", "Swimming pools"],
    images: ["sakala-resort.jpg"],
    priority: 1
  },
  {
    id: "bali-cliff",
    name: "Bali Cliff",
    category: "featured",
    coordinates: [115.1662, -8.8486], // Bali Cliff (Ungasan, above Nyang Nyang Beach) - CORRECT
    description: "Dramatic limestone cliffs offering breathtaking views of the Indian Ocean. The area features several luxury resorts and beach clubs built along the cliff edge.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "18 km",
    operatingHours: "Best visited during daylight hours",
    pricing: {
      entry: "Free for public areas",
      activities: "Varies by venue"
    },
    specialEvents: [],
    features: ["Panoramic ocean views", "Sunset viewpoints", "Cliff-edge resorts", "Photography spots"],
    images: ["bali-cliff.jpg"],
    priority: 2
  },
  {
    id: "uluwatu-temple",
    name: "Uluwatu Temple",
    category: "featured",
    coordinates: [115.0849, -8.8296], // Uluwatu Temple (Pecatu) - CORRECT
    description: "Pura Luhur Uluwatu is one of Bali's six key temples, perched dramatically on a steep cliff 70 meters above the Indian Ocean. The temple is inhabited by monkeys who are believed to guard it from bad influences.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "22 km",
    operatingHours: "9:00 AM - 7:00 PM daily",
    pricing: {
      entry: "IDR 30,000/person",
      kecakDance: "IDR 100,000/person"
    },
    specialEvents: [
      {
        name: "Kecak Fire Dance",
        schedule: "Daily at 6:00 PM",
        price: "IDR 100,000/person"
      }
    ],
    features: ["Ancient temple", "Panoramic ocean views", "Kecak dance performances", "Monkey forest"],
    images: ["uluwatu-temple.jpg"],
    priority: 3
  },
  // Featured Attractions - Additional
  {
    id: "tanah-lot",
    name: "Tanah Lot Temple",
    category: "featured",
    coordinates: [115.0865, -8.6216], // Tanah Lot Temple (Beraban)
    description: "A sea temple on a rock formation, famous for its offshore setting and sunset views.",
    drivingTime: "Approximately 1 hour 45 minutes from Sakala Resort",
    distance: "65 km",
    operatingHours: "7:00 AM - 7:00 PM daily",
    pricing: {
      entry: "IDR 60,000/person"
    },
    specialEvents: [],
    features: ["Sea temple", "Sunset viewpoint", "Photography spot"],
    images: ["tanah-lot.jpg"],
    priority: 4
  },
  {
    id: "tegalalang-terraces",
    name: "Tegalalang Rice Terraces",
    category: "featured",
    coordinates: [115.2773, -8.4302], // Tegalalang Rice Terraces (Ubud)
    description: "Iconic rice terraces with a beautiful jungle backdrop, offering scenic walks and swings.",
    drivingTime: "Approximately 1 hour 30 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "6:00 AM - 6:00 PM daily",
    pricing: {
      entry: "IDR 15,000/person"
    },
    specialEvents: [],
    features: ["Rice terraces", "Swing spots", "Scenic walks", "Jungle views"],
    images: ["tegalalang-terraces.jpg"],
    priority: 5
  },
  {
    id: "ubud-monkey-forest",
    name: "Ubud Monkey Forest",
    category: "featured",
    coordinates: [115.2590, -8.5190], // Sacred Monkey Forest Sanctuary (Ubud)
    description: "A nature reserve and Hindu temple complex home to over 700 Balinese long-tailed macaques.",
    drivingTime: "Approximately 1 hour 20 minutes from Sakala Resort",
    distance: "55 km",
    operatingHours: "8:30 AM - 6:00 PM daily",
    pricing: {
      entry: "IDR 80,000/person"
    },
    specialEvents: [],
    features: ["Macaque sanctuary", "Ancient temples", "Jungle paths", "Cultural significance"],
    images: ["ubud-monkey-forest.jpg"],
    priority: 6
  },
  {
    id: "campuhan-ridge-walk",
    name: "Campuhan Ridge Walk",
    category: "featured",
    coordinates: [115.2631, -8.5103], // Campuhan Ridge Walk (Ubud)
    description: "A scenic hiking trail along the ridge of two hills offering panoramic valley views.",
    drivingTime: "Approximately 1 hour 25 minutes from Sakala Resort",
    distance: "58 km",
    operatingHours: "24/7 (recommended early morning or late afternoon)",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Hiking trail", "Valley views", "Sunrise and sunset spots", "Free entry"],
    images: ["campuhan-ridge-walk.jpg"],
    priority: 7
  },
  {
    id: "goa-gajah",
    name: "Goa Gajah (Elephant Cave)",
    category: "featured",
    coordinates: [115.2900, -8.4833], // Goa Gajah (Elephant Cave, Pejeng)
    description: "A 9th-century archaeological site with cave, bathing pools, and fountains.",
    drivingTime: "Approximately 1 hour 35 minutes from Sakala Resort",
    distance: "62 km",
    operatingHours: "9:00 AM - 5:00 PM daily",
    pricing: {
      entry: "IDR 50,000/person"
    },
    specialEvents: [],
    features: ["Ancient cave", "Bathing pools", "Archaeological site", "Balinese sculptures"],
    images: ["goa-gajah.jpg"],
    priority: 8
  },
  {
    id: "sanur-beach",
    name: "Sanur Beach",
    category: "featured",
    coordinates: [115.3189, -8.7081], // Sanur Beach
    description: "A laid-back beach town known for its calm waters, sunrise views, and beachfront promenades.",
    drivingTime: "Approximately 25 minutes from Sakala Resort",
    distance: "15 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Sunrise views", "Cycling path", "Beachfront cafes", "Swimming", "Water sports"],
    images: ["sanur-beach.jpg"],
    priority: 9
  },
  {
    id: "kuta-beach",
    name: "Kuta Beach",
    category: "featured",
    coordinates: [115.1683, -8.7091], // Kuta Beach
    description: "Famous for its long sandy beach, surfing waves, and vibrant nightlife.",
    drivingTime: "Approximately 30 minutes from Sakala Resort",
    distance: "18 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Beach bars", "Sunset views", "Shopping"],
    images: ["kuta-beach.jpg"],
    priority: 10
  },
  {
    id: "seminyak-beach",
    name: "Seminyak Beach",
    category: "featured",
    coordinates: [115.1648, -8.6910], // Seminyak Beach
    description: "Upscale beach area known for its stylish resorts, beach clubs, and high-end shopping.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Beachfront dining", "Sunset lounges", "Surfing", "Boutique shops"],
    images: ["seminyak-beach.jpg"],
    priority: 11
  },
  {
    id: "waterbom-bali",
    name: "Waterbom Bali",
    category: "featured",
    coordinates: [115.1678, -8.7191], // Waterbom Bali (Kuta)
    description: "One of Asia’s top water parks featuring thrilling slides, lazy rivers, and tropical gardens.",
    drivingTime: "Approximately 30 minutes from Sakala Resort",
    distance: "18 km",
    operatingHours: "9:00 AM - 6:00 PM daily",
    pricing: {
      entry: "IDR 500,000/person (adult), IDR 300,000/person (child)"
    },
    specialEvents: [],
    features: ["Water slides", "Lazy river", "Kids area", "Cabanas", "Restaurants"],
    images: ["waterbom-bali.jpg"],
    priority: 12
  },
  // Beach Clubs
  {
    id: "reef-beach-club",
    name: "Reef Beach Club",
    category: "beach-clubs",
    coordinates: [115.2269, -8.8055], // Reef Beach Club (Peninsula Beach Nusa Dua) - CORRECT
    description: "Located at Peninsula Beach Nusa Dua, Reef Beach Club offers a lavish yet comfortably serene beachfront experience with excellent dining options and water activities.",
    drivingTime: "Approximately 10 minutes from Sakala Resort",
    distance: "3 km",
    operatingHours: "9:00 AM - 10:00 PM daily",
    pricing: {
      entry: "IDR 250,000/person (redeemable for food and beverages)",
      food: "Average meal IDR 150,000 - 300,000"
    },
    specialEvents: [
      {
        name: "Sunset DJ Sessions",
        schedule: "Friday and Saturday, 4:00 PM - 7:00 PM"
      }
    ],
    features: ["Beachfront dining", "Swimming pool", "Sun loungers", "Water sports", "Live music"],
    images: ["reef-beach-club.jpg"],
    priority: 4
  },
  {
    id: "omnia-dayclub",
    name: "OMNIA Dayclub (now Savaya Bali)",
    category: "beach-clubs",
    coordinates: [115.1380078, -8.8462129], // OMNIA Dayclub (now Savaya Bali) - CORRECT
    description: "Perched on the limestone cliffs of Uluwatu, OMNIA Dayclub offers a luxurious day club experience with an infinity pool overlooking the Indian Ocean and world-class DJs.",
    drivingTime: "Approximately 40 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "11:00 AM - 7:00 PM daily",
    pricing: {
      entry: "Starting from IDR 500,000/person (includes credit for food and beverages)",
      cabana: "IDR 5,000,000 - 10,000,000 (minimum spend)"
    },
    specialEvents: [
      {
        name: "International DJ Performances",
        schedule: "Check website for schedule",
        price: "Varies by event"
      }
    ],
    features: ["Infinity pool", "VIP cabanas", "World-class DJs", "Premium dining", "Cliff-edge views"],
    images: ["omnia-dayclub.jpg"],
    priority: 5
  },
  {
    id: "ulu-cliff-house",
    name: "Ulu Cliff House",
    category: "beach-clubs",
    coordinates: [115.0813224, -8.8139681], // Ulu Cliff House (Uluwatu) - CORRECT
    description: "A clifftop oasis offering panoramic views of the Indian Ocean, Ulu Cliff House features multiple dining concepts, two infinity pools, and a laid-back atmosphere.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "25 km",
    operatingHours: "11:00 AM - 10:00 PM daily",
    pricing: {
      entry: "Free (minimum spend may apply)",
      food: "Average meal IDR 200,000 - 400,000"
    },
    specialEvents: [
      {
        name: "Sunset Sessions",
        schedule: "Daily, 5:00 PM - 7:00 PM"
      }
    ],
    features: ["Clifftop location", "Infinity pools", "Multiple restaurants", "Cocktail bar", "Sunset views"],
    images: ["ulu-cliff-house.jpg"],
    priority: 6
  },
  {
    id: "sundays-beach-club",
    name: "Sundays Beach Club",
    category: "beach-clubs",
    coordinates: [115.1532, -8.8487], // Sundays Beach Club (Pecatu, below Ungasan Clifftop Resort) - CORRECT
    description: "Nestled on a pristine white sand beach at the base of cliffs in the Bukit Peninsula, Sundays Beach Club offers a complete beach experience with water sports, dining, and bonfires.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "23 km",
    operatingHours: "9:00 AM - 10:00 PM daily",
    pricing: {
      entry: "IDR 300,000/person (fully redeemable for food and beverages)",
      food: "Average meal IDR 150,000 - 300,000"
    },
    specialEvents: [
      {
        name: "Beach Bonfire",
        schedule: "Daily at sunset"
      }
    ],
    features: ["Private beach", "Water sports", "Beachfront dining", "Beach bonfires", "Inclinator access"],
    images: ["sundays-beach-club.jpg"],
    priority: 7
  },
  
  // Additional Beach Clubs
  {
    id: "finns-beach-club",
    name: "Finns Beach Club",
    category: "beach-clubs",
    coordinates: [115.149, -8.670], // Canggu
    description: "A lively beachfront club with pools, bars, and live entertainment.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "45 km",
    operatingHours: "9:00 AM - 10:00 PM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Beachfront bar", "Infinity pool", "Live music", "Cabanas"],
    images: ["finns-beach-club.jpg"],
    priority: 8
  },
  {
    id: "tropical-temptation-beach-club",
    name: "Tropical Temptation Beach Club",
    category: "beach-clubs",
    coordinates: [115.171, -8.805], // Pecatu
    description: "Chic beach club offering sunset cocktails, daybeds, and ocean views.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "22 km",
    operatingHours: "10:00 AM - 8:00 PM daily",
    pricing: { entry: "IDR 250,000/person" },
    specialEvents: [],
    features: ["Sunset cocktails", "Daybeds", "Ocean views"],
    images: ["tropical-temptation-beach-club.jpg"],
    priority: 9
  },
  {
    id: "atlas-beach-club",
    name: "Atlas Beach Club",
    category: "beach-clubs",
    coordinates: [115.163, -8.687], // Seminyak
    description: "Vibrant poolside club with cocktails, DJ sets, and lounging areas.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 12:00 AM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Poolside lounging", "Cocktails", "Live DJs"],
    images: ["atlas-beach-club.jpg"],
    priority: 10
  },
  {
    id: "vue-beach-club",
    name: "Vue Beach Club",
    category: "beach-clubs",
    coordinates: [115.088, -8.829], // Uluwatu
    description: "Cliffside beach club offering panoramic ocean views, infinity pool, and fine dining.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "25 km",
    operatingHours: "10:00 AM - 10:00 PM daily",
    pricing: { entry: "IDR 300,000/person" },
    specialEvents: [],
    features: ["Infinity pool", "Cliff views", "Fine dining"],
    images: ["vue-beach-club.jpg"],
    priority: 11
  },
  {
    id: "cafe-del-mar-bali-beach-club",
    name: "Café del Mar Bali Beach Club",
    category: "beach-clubs",
    coordinates: [115.1403, -8.6587], // Canggu
    description: "World-renowned beach club with Mediterranean-inspired dining and pool parties.",
    drivingTime: "Approximately 1 hour from Sakala Resort",
    distance: "55 km",
    operatingHours: "10:00 AM - 11:00 PM daily",
    pricing: { entry: "IDR 300,000/person (redeemable)" },
    specialEvents: [],
    features: ["Pool parties", "Mediterranean cuisine", "Sunset terrace"],
    images: ["cafe-del-mar-bali-beach-club.jpg"],
    priority: 12
  },
  {
    id: "roosterfish-beach-club-bali",
    name: "Roosterfish Beach Club Bali",
    category: "beach-clubs",
    coordinates: [115.1365, -8.6734], // Canggu
    description: "Chic beachfront venue offering seafood, cocktails, and oceanfront vibes.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "45 km",
    operatingHours: "10:00 AM - 9:00 PM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Seafood menu", "Infinity pool", "Beachfront bar"],
    images: ["roosterfish-beach-club-bali.jpg"],
    priority: 13
  },
  {
    id: "the-edge-bali",
    name: "The Edge Bali",
    category: "beach-clubs",
    coordinates: [115.093, -8.818], // Uluwatu
    description: "Exclusive cliff-top beach club offering private villas, infinity pools, and fine dining.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "25 km",
    operatingHours: "8:00 AM - 8:00 PM daily",
    pricing: { entry: "IDR 500,000/person" },
    specialEvents: [],
    features: ["Cliff-top villas", "Infinity pools", "Fine dining"],
    images: ["the-edge-bali.jpg"],
    priority: 14
  },
  {
    id: "mrs-sippy-seminyak",
    name: "Mrs Sippy, Seminyak",
    category: "beach-clubs",
    coordinates: [115.170, -8.691], // Seminyak
    description: "Popular pool club known for its tiered saltwater pool, daybeds, and social atmosphere.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 12:00 AM daily",
    pricing: { entry: "IDR 150,000/person" },
    specialEvents: [],
    features: ["Saltwater pool", "Daybeds", "Social events"],
    images: ["mrs-sippy-seminyak.jpg"],
    priority: 15
  },
  {
    id: "the-lawn-canggu",
    name: "The Lawn, Canggu",
    category: "beach-clubs",
    coordinates: [115.136, -8.647], // Canggu
    description: "Laid-back beachfront bar with daybeds, cocktails, and sunset sessions.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "45 km",
    operatingHours: "8:00 AM - 11:00 PM daily",
    pricing: { entry: "IDR 150,000/person" },
    specialEvents: [],
    features: ["Daybeds", "Sunset sessions", "Cocktails"],
    images: ["the-lawn-canggu.jpg"],
    priority: 16
  },
  {
    id: "potato-head-seminyak",
    name: "Potato Head, Seminyak",
    category: "beach-clubs",
    coordinates: [115.1575, -8.688], // Seminyak
    description: "Iconic beach club featuring an ocean pool, music events, and global cuisine.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 12:00 AM daily",
    pricing: { entry: "IDR 300,000/person" },
    specialEvents: [],
    features: ["Ocean pool", "Music events", "Global cuisine"],
    images: ["potato-head-seminyak.jpg"],
    priority: 17
  },
  {
    id: "jungle-fish-ubud",
    name: "Jungle Fish, Ubud",
    category: "beach-clubs",
    coordinates: [115.262, -8.5108], // Ubud
    description: "Cliff-top pool venue set amid jungle scenery with hanging bridge access.",
    drivingTime: "Approximately 1 hour 30 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "8:00 AM - 7:00 PM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Cliff-top pool", "Jungle views", "Hanging bridge"],
    images: ["jungle-fish-ubud.jpg"],
    priority: 18
  },
  {
    id: "wanna-jungle-pool-and-bar-ubud",
    name: "Wanna Jungle Pool and Bar, Ubud",
    category: "beach-clubs",
    coordinates: [115.2639, -8.5056], // Ubud
    description: "Rustic jungle pool bar featuring natural pools, swing seats, and wooden decks.",
    drivingTime: "Approximately 1 hour 30 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "8:00 AM - 7:00 PM daily",
    pricing: { entry: "IDR 150,000/person" },
    specialEvents: [],
    features: ["Natural pools", "Swing seats", "Jungle ambiance"],
    images: ["wanna-jungle-pool-and-bar-ubud.jpg"],
    priority: 19
  },
  {
    id: "cocoon-day-club-seminyak",
    name: "Cocoon Day Club, Seminyak",
    category: "beach-clubs",
    coordinates: [115.1676, -8.6882], // Seminyak
    description: "Luxurious day club with ocean view pool, VIP cabanas, and DJ parties.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 6:00 PM daily",
    pricing: { entry: "IDR 400,000/person" },
    specialEvents: [],
    features: ["Ocean view pool", "VIP cabanas", "DJ parties"],
    images: ["cocoon-day-club-seminyak.jpg"],
    priority: 20
  },
  {
    id: "white-rock-beach-club-ungasan",
    name: "White Rock Beach Club, Ungasan",
    category: "beach-clubs",
    coordinates: [115.083, -8.8045], // Ungasan
    description: "Serene beach club at the base of cliffs offering daybeds and sunset cocktails.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "23 km",
    operatingHours: "9:00 AM - 9:00 PM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Cliff-base daybeds", "Sunset cocktails", "Beach access"],
    images: ["white-rock-beach-club-ungasan.jpg"],
    priority: 21
  },
  {
    id: "canna-bali",
    name: "Canna Bali",
    category: "beach-clubs",
    coordinates: [115.2264, -8.7912], // Nusa Dua
    description: "Elegant beachfront club with infinity pool, fine dining, and daybeds.",
    drivingTime: "Approximately 10 minutes from Sakala Resort",
    distance: "3 km",
    operatingHours: "10:00 AM - 10:00 PM daily",
    pricing: { entry: "IDR 300,000/person" },
    specialEvents: [],
    features: ["Infinity pool", "Fine dining", "Daybeds"],
    images: ["canna-bali.jpg"],
    priority: 22
  },
  {
    id: "kubu-at-ayana-jimbaran",
    name: "Kubu at AYANA, Jimbaran",
    category: "beach-clubs",
    coordinates: [115.1566, -8.795], // Jimbaran
    description: "Romantic beachfront dining club under lantern-lit bamboo huts.",
    drivingTime: "Approximately 20 minutes from Sakala Resort",
    distance: "12 km",
    operatingHours: "6:00 PM - 10:00 PM daily",
    pricing: { dining: "IDR 500,000/person" },
    specialEvents: [],
    features: ["Beachfront huts", "Fine dining", "Romantic ambiance"],
    images: ["kubu-at-ayana-jimbaran.jpg"],
    priority: 23
  },
  
  // Water Sports
  {
    id: "tanjung-benoa-watersports",
    name: "Tanjung Benoa Water Sports",
    category: "water-sports",
    coordinates: [115.2254, -8.7642], // Tanjung Benoa Water Sports (Tanjung Benoa) - CORRECT
    description: "Tanjung Benoa is Bali's water sports hub, offering a wide range of activities including parasailing, jet skiing, banana boat rides, and more along its 5km stretch of beach.",
    drivingTime: "Approximately 5 minutes from Sakala Resort",
    distance: "1 km",
    operatingHours: "8:00 AM - 5:00 PM daily",
    pricing: {
      parasailing: "IDR 350,000/person",
      jetSki: "IDR 400,000/15 minutes",
      bananaBoat: "IDR 150,000/person",
      packages: "IDR 700,000 - 1,500,000 for multiple activities"
    },
    specialEvents: [],
    features: ["Parasailing", "Jet skiing", "Banana boat", "Flyboarding", "Seawalking", "Diving"],
    images: ["tanjung-benoa-watersports.jpg"],
    priority: 8
  },
  {
    id: "nusa-dua-watersports",
    name: "Nusa Dua Water Sports",
    category: "water-sports",
    coordinates: [115.2262, -8.8077], // Nusa Dua Water Sports (Nusa Dua Beach) - CORRECT
    description: "The beaches of Nusa Dua offer various water sports activities in a more upscale setting, with clear waters and less crowded beaches compared to Tanjung Benoa.",
    drivingTime: "Approximately 15 minutes from Sakala Resort",
    distance: "5 km",
    operatingHours: "8:00 AM - 5:00 PM daily",
    pricing: {
      snorkeling: "IDR 250,000/person",
      glassbottomBoat: "IDR 200,000/person",
      seawalking: "IDR 600,000/person"
    },
    specialEvents: [],
    features: ["Snorkeling", "Glass bottom boat", "Seawalking", "Stand-up paddleboarding"],
    images: ["nusa-dua-watersports.jpg"],
    priority: 9
  },
  
  // Cultural Sites
  {
    id: "museum-pasifika",
    name: "Museum PASIFIKA",
    category: "cultural",
    coordinates: [115.2290, -8.7950], // Museum PASIFIKA (Nusa Dua, ITDC area) - CORRECT
    description: "Museum PASIFIKA houses an impressive collection of artworks and artifacts from across the Asia-Pacific region, with a particular focus on Balinese and Indonesian art.",
    drivingTime: "Approximately 15 minutes from Sakala Resort",
    distance: "5 km",
    operatingHours: "10:00 AM - 6:00 PM daily (Closed on public holidays)",
    pricing: {
      entry: "IDR 100,000/person",
      guidedTour: "IDR 50,000 additional"
    },
    specialEvents: [
      {
        name: "Art Exhibitions",
        schedule: "Check website for current exhibitions"
      }
    ],
    features: ["Art collections", "Cultural artifacts", "Guided tours", "Gift shop"],
    images: ["museum-pasifika.jpg"],
    priority: 10
  },
  {
    id: "caow-eng-bio-temple",
    name: "Caow Eng Bio Chinese Buddhist Temple",
    category: "cultural",
    coordinates: [115.2262, -8.7608], // Caow Eng Bio Temple (Tanjung Benoa) - CORRECT
    description: "A historic Chinese Buddhist temple in Tanjung Benoa that showcases the cultural diversity of Bali and the influence of Chinese immigrants on the island's history.",
    drivingTime: "Approximately 10 minutes from Sakala Resort",
    distance: "2 km",
    operatingHours: "8:00 AM - 5:00 PM daily",
    pricing: {
      entry: "Free (donations appreciated)"
    },
    specialEvents: [
      {
        name: "Chinese New Year Celebrations",
        schedule: "Lunar New Year period"
      }
    ],
    features: ["Historic architecture", "Buddhist shrines", "Cultural heritage", "Prayer ceremonies"],
    images: ["caow-eng-bio-temple.jpg"],
    priority: 11
  },
  // Balinese Traditional Villages
  {
    id: "penglipuran-village",
    name: "Penglipuran Village",
    category: "traditional-villages",
    coordinates: [115.3157, -8.2856],
    description: "Known for its well-preserved traditional bamboo architecture and stone pathways, Penglipuran Village exemplifies Bali's cultural heritage.",
    drivingTime: "Approximately 1 hour 30 minutes from Sakala Resort",
    distance: "60 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Traditional architecture", "Stone pathways", "Bamboo houses"],
    images: ["penglipuran-village.jpg"],
    priority: 1
  },
  {
    id: "tenganan-pegringsingan-village",
    name: "Tenganan Pegringsingan Village",
    category: "traditional-villages",
    coordinates: [115.4764, -8.4408],
    description: "One of Bali's oldest 'Bali Aga' villages, Tenganan is renowned for its double ikat weaving tradition and ancient customs.",
    drivingTime: "Approximately 2 hours from Sakala Resort",
    distance: "75 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Double ikat weaving", "Ancient customs", "Traditional community"],
    images: ["tenganan-pegringsingan.jpg"],
    priority: 2
  },
  {
    id: "nyuh-kuning-village",
    name: "Nyuh Kuning Village",
    category: "traditional-villages",
    coordinates: [115.2775, -8.5106],
    description: "A lush rural village near Ubud, Nyuh Kuning offers traditional thatched-roof homes, rice terraces, and a tranquil atmosphere.",
    drivingTime: "Approximately 1 hour 20 minutes from Sakala Resort",
    distance: "55 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Rice terraces", "Thatched-roof homes", "Tranquil environment"],
    images: ["nyuh-kuning-village.jpg"],
    priority: 3
  },
  {
    id: "trunyan-village",
    name: "Trunyan Village",
    category: "traditional-villages",
    coordinates: [115.3712, -8.2584],
    description: "Located on the eastern shore of Lake Batur, Trunyan Village is famous for its unique burial tradition where bodies rest in bamboo cages under ancient banyan trees.",
    drivingTime: "Approximately 2 hours from Sakala Resort",
    distance: "70 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Lake Batur views", "Unique burial tradition", "Ancient banyan trees"],
    images: ["trunyan-village.jpg"],
    priority: 4
  },
  {
    id: "sidemen-village",
    name: "Sidemen Village",
    category: "traditional-villages",
    coordinates: [115.5533, -8.5333],
    description: "With stunning views of Mount Agung and terraced rice fields, Sidemen Village preserves traditional weaving and rice farming practices.",
    drivingTime: "Approximately 2 hours 15 minutes from Sakala Resort",
    distance: "80 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Mount Agung views", "Terraced rice fields", "Traditional weaving"],
    images: ["sidemen-village.jpg"],
    priority: 5
  },
  {
    id: "kapal-village",
    name: "Kapal Village",
    category: "traditional-villages",
    coordinates: [114.7889, -8.1422],
    description: "A northern coastal village known for salt production and seaweed farming, offering insight into local marine-based livelihoods.",
    drivingTime: "Approximately 3 hours from Sakala Resort",
    distance: "120 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Salt production", "Seaweed farming", "Coastal community"],
    images: ["kapal-village.jpg"],
    priority: 6
  },
  {
    id: "cempaga-village",
    name: "Cempaga Village",
    category: "traditional-villages",
    coordinates: [115.3600, -8.4400],
    description: "A traditional village in Bangli Regency with a thriving community preserving old Balinese customs and communal compound architecture.",
    drivingTime: "Approximately 1 hour from Sakala Resort",
    distance: "45 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Communal compounds", "Balinese customs", "Local crafts"],
    images: ["cempaga-village.jpg"],
    priority: 7
  },
  {
    id: "sembiran-village",
    name: "Sembiran Village",
    category: "traditional-villages",
    coordinates: [115.0703, -8.33],
    description: "An ancient coastal village with archaeological significance, Sembiran has evidence of settlement dating back over two millennia and retains traditional pottery practices.",
    drivingTime: "Approximately 3 hours 30 minutes from Sakala Resort",
    distance: "130 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Archaeological sites", "Traditional pottery", "Coastal setting"],
    images: ["sembiran-village.jpg"],
    priority: 8
  },
  {
    id: "sidatapa-village",
    name: "Sidatapa Village",
    category: "traditional-villages",
    coordinates: [115.0897, -8.4167],
    description: "A rural village renowned for its pottery industry, Sidatapa produces earthenware using traditional kilns and local clay.",
    drivingTime: "Approximately 3 hours from Sakala Resort",
    distance: "110 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Pottery kilns", "Local clay", "Artisan crafts"],
    images: ["sidatapa-village.jpg"],
    priority: 9
  },
  {
    id: "tigawasa-village",
    name: "Tigawasa Village",
    category: "traditional-villages",
    coordinates: [115.1167, -8.2167],
    description: "A remote highland village offering panoramic views over the Bay of Singaraja and rich Balinese cultural experiences.",
    drivingTime: "Approximately 3 hours from Sakala Resort",
    distance: "100 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Highland views", "Cultural experiences", "Rice terraces"],
    images: ["tigawasa-village.jpg"],
    priority: 10
  },
  {
    id: "pedawa-village",
    name: "Pedawa Village",
    category: "traditional-villages",
    coordinates: [115.6528, -8.4333],
    description: "Renowned for its cast iron craftsmanship, Pedawa Village features artisan workshops producing traditional Balinese tools and ornamental pieces.",
    drivingTime: "Approximately 1 hour 45 minutes from Sakala Resort",
    distance: "65 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Cast iron workshops", "Traditional tools", "Ornamental pieces"],
    images: ["pedawa-village.jpg"],
    priority: 11
  },
  {
    id: "banyuseri-village",
    name: "Banyuseri Village",
    category: "traditional-villages",
    coordinates: [115.1594, -8.8108],
    description: "A tranquil coastal village east of Sanur known for traditional fishing boats, seaweed farming, and serene beaches.",
    drivingTime: "Approximately 25 minutes from Sakala Resort",
    distance: "15 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Fishing boats", "Seaweed farming", "Beaches"],
    images: ["banyuseri-village.jpg"],
    priority: 12
  },
  {
    id: "julah-village",
    name: "Julah Village",
    category: "traditional-villages",
    coordinates: [115.5275, -8.0161],
    description: "A quaint coastal village known for traditional fishing, picturesque harbors, and calm beaches.",
    drivingTime: "Approximately 2 hours 30 minutes from Sakala Resort",
    distance: "95 km",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Fishing harbor", "Traditional fishing boats", "Beaches"],
    images: ["julah-village.jpg"],
    priority: 13
  }
];

// Export the destinations data
if (typeof module !== 'undefined') {
  module.exports = { destinations };
}

// --- DEBUG: Check for out-of-bounds markers in Bali ---
(function() {
  const minLng = 114.4, maxLng = 115.7, minLat = -9.2, maxLat = -8.0;
  destinations.forEach(dest => {
    const [lng, lat] = dest.coordinates;
    if (lng < minLng || lng > maxLng || lat < minLat || lat > maxLat) {
      console.warn('Out of bounds:', dest.name, dest.coordinates);
    }
  });
})();
// --- END DEBUG ---
