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
    coordinates: [115.234151, -8.764225], // Corrected: Sakala Resort Bali
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
    coordinates: [115.1662, -8.8486], // Corrected: Bali Cliff
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
    coordinates: [115.0849, -8.8296], // Corrected: Uluwatu Temple
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
  
  // Beach Clubs
  {
    id: "reef-beach-club",
    name: "Reef Beach Club",
    category: "beach-clubs",
    coordinates: [115.2269, -8.8055], // Corrected: Reef Beach Club
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
    name: "OMNIA Dayclub",
    category: "beach-clubs",
    coordinates: [115.1086, -8.8487], // Corrected: OMNIA Dayclub (Savaya)
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
    coordinates: [115.1081, -8.8036], // Corrected: Ulu Cliff House
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
    coordinates: [115.1532, -8.8487], // Corrected: Sundays Beach Club
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
  
  // Water Sports
  {
    id: "tanjung-benoa-watersports",
    name: "Tanjung Benoa Water Sports",
    category: "water-sports",
    coordinates: [115.2254, -8.7642], // Corrected: Tanjung Benoa Water Sports
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
    coordinates: [115.2262, -8.8077], // Corrected: Nusa Dua Water Sports
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
    coordinates: [115.2290, -8.7950], // Approximate coordinates
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
    coordinates: [115.2262, -8.7608], // Corrected: Caow Eng Bio Chinese Buddhist Temple
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
