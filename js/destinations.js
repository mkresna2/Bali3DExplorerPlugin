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
    coordinates: [115.2215112, -8.7592114], // Sakala Resort Bali (Tanjung Benoa) - CORRECT
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
    id: "uluwatu-temple",
    name: "Uluwatu Temple",
    category: "featured",
    coordinates: [115.084988, -8.829183], // Uluwatu Temple (Pecatu) - CORRECT
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
  {
    id: "tanah-lot",
    name: "Tanah Lot Temple",
    category: "featured",
    coordinates: [115.087054, -8.620784], // Tanah Lot Temple (Beraban)
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
    coordinates: [115.279331, -8.431787], // Tegalalang Rice Terraces (Ubud)
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
    coordinates: [115.254736, -8.503587], // Campuhan Ridge Walk (Ubud)
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
    coordinates: [115.287161, -8.523479], // Goa Gajah (Elephant Cave, Pejeng)
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
    id: "gwk-park",
    name: "Garuda Wisnu Kencana Cultural Park",
    category: "featured",
    coordinates: [115.166714, -8.813670], // GWK Cultural Park
    description: "A cultural park featuring a giant statue of Vishnu riding Garuda, with traditional Balinese performances and exhibitions.",
    drivingTime: "Approximately 30 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "9:00 AM - 7:00 PM daily",
    pricing: { entry: "IDR 125,000/person" },
    specialEvents: [ { name: "Cultural dance performance", schedule: "Daily at 5:00 PM", price: "Included in entry" } ],
    features: ["Giant statue","Performances","Exhibitions","Gardens"],
    images: ["gwk-park.jpg"],
    priority: 9
  },
  {
    id: "mount-batur",
    name: "Mount Batur",
    category: "featured",
    coordinates: [115.364338, -8.282654], // Mount Batur
    description: "Active volcano offering sunrise trekking tours and panoramic views of Lake Batur.",
    drivingTime: "Approximately 2 hours 30 minutes from Sakala Resort",
    distance: "90 km",
    operatingHours: "24/7 (trekking tours pre-dawn)",
    pricing: { trekking: "IDR 500,000/person" },
    specialEvents: [ { name: "Sunrise trekking", schedule: "Daily at 2:00 AM", price: "IDR 500,000/person" } ],
    features: ["Volcano trekking","Sunrise views","Lake vistas","Hot springs"],
    images: ["mount-batur.jpg"],
    priority: 10
  },
  {
    id: "kelingking-beach",
    name: "Kelingking Beach",
    category: "featured",
    coordinates: [115.472732, -8.752530], // Kelingking Beach (Nusa Penida)
    description: "Cliff viewpoint overlooking a T-Rex shaped peninsula and secluded beach.",
    drivingTime: "Approximately 2 hours from Sakala Resort (via ferry)",
    distance: "50 km",
    operatingHours: "Open 24/7",
    pricing: { entry: "IDR 5,000/person" },
    specialEvents: [],
    features: ["Cliff viewpoint","Secluded beach","Photography spot"],
    images: ["kelingking-beach.jpg"],
    priority: 11
  },
  {
    id: "tegenungan-waterfall",
    name: "Tegenungan Waterfall",
    category: "featured",
    coordinates: [115.288893, -8.575351], // Tegenungan Waterfall
    description: "Popular waterfall surrounded by lush jungle with swimming areas.",
    drivingTime: "Approximately 1 hour 15 minutes from Sakala Resort",
    distance: "50 km",
    operatingHours: "7:00 AM - 6:00 PM daily",
    pricing: { entry: "IDR 15,000/person" },
    specialEvents: [],
    features: ["Waterfall","Swimming","Jungle trails","Photo spots"],
    images: ["tegenungan-waterfall.jpg"],
    priority: 12
  },
  {
    id: "bali-zoo",
    name: "Bali Zoo",
    category: "featured",
    coordinates: [115.265666, -8.591700], // Bali Zoo
    description: "Family-friendly zoo with wildlife encounters and safari bus rides.",
    drivingTime: "Approximately 1 hour 10 minutes from Sakala Resort",
    distance: "55 km",
    operatingHours: "9:00 AM - 5:00 PM daily",
    pricing: { entry: "IDR 385,000/adult, IDR 295,000/child" },
    specialEvents: [ { name: "Elephant ride", schedule: "Daily", price: "Additional cost" } ],
    features: ["Animal encounters","Elephant rides","Safari bus","Night tours"],
    images: ["bali-zoo.jpg"],
    priority: 13
  },
  {
    id: "bali-safari-marine-park",
    name: "Bali Safari & Marine Park",
    category: "featured",
    coordinates: [115.345925, -8.581769], // Safari & Marine Park
    description: "Wildlife park with land and marine shows, safari journeys, and water attractions.",
    drivingTime: "Approximately 1 hour 20 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "9:00 AM - 5:00 PM daily",
    pricing: { entry: "IDR 550,000/person" },
    specialEvents: [ { name: "Land of the Kings show", schedule: "Daily at 4:30 PM", price: "Included" } ],
    features: ["Safari journey","Marine theater","Animal shows","Water rides"],
    images: ["bali-safari.jpg"],
    priority: 14
  },
  {
    id: "waterbom-bali",
    name: "Waterbom Bali",
    category: "featured",
    coordinates: [115.169802, -8.728771], // Waterbom Bali (Kuta)
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
    priority: 15
  },
  // Top Beaches
  {
    id: "kuta-beach",
    name: "Kuta Beach",
    category: "beaches",
    coordinates: [115.1690826, -8.7201224],
    description: "One of Bali's most popular beaches, known for its long sandy coast, vibrant atmosphere, and surf culture.",
    drivingTime: "Approximately 30 minutes from Sakala Resort",
    distance: "18 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Sunset viewing", "Street food stalls", "Beach bars"],
    images: ["kuta-beach.jpg"],
    priority: 1
  },
  {
    id: "jimbaran-beach",
    name: "Jimbaran Beach",
    category: "beaches",
    coordinates: [115.1670198, -8.7749649],
    description: "Scenic bay famous for its seafood restaurants on the sand and beautiful sunsets.",
    drivingTime: "Approximately 25 minutes from Sakala Resort",
    distance: "15 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Seafood dining", "Sunset views", "Calm waters"],
    images: ["jimbaran-beach.jpg"],
    priority: 2
  },
  {
    id: "nusa-dua-beach",
    name: "Nusa Dua Beach",
    category: "beaches",
    coordinates: [115.232862, -8.7961434],
    description: "Pristine white-sand beaches with calm waters and upscale resorts in Nusa Dua.",
    drivingTime: "Approximately 10 minutes from Sakala Resort",
    distance: "3 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Swimming", "Water sports", "Resort beach", "Clean sands"],
    images: ["nusa-dua-beach.jpg"],
    priority: 3
  },
  {
    id: "sanur-beach",
    name: "Sanur Beach",
    category: "beaches",
    coordinates: [115.263561, -8.706701],
    description: "Calm, shallow waters ideal for families, with a long beachfront promenade.",
    drivingTime: "Approximately 25 minutes from Sakala Resort",
    distance: "18 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Beachfront cycling path", "Calm lagoon", "Sunrise views"],
    images: ["sanur-beach.jpg"],
    priority: 4
  },
  {
    id: "canggu-beach",
    name: "Canggu Beach",
    category: "beaches",
    coordinates: [115.133108, -8.661778],
    description: "Trendy surf and yoga hub with black sand, beach bars, and street art.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "45 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Hip cafes", "Sunset views"],
    images: ["canggu-beach.jpg"],
    priority: 5
  },
  {
    id: "padang-padang-beach",
    name: "Padang Padang Beach",
    category: "beaches",
    coordinates: [115.103788, -8.810880],
    description: "Small, hidden cove popular for surfing and featured in the movie 'Eat Pray Love'.",
    drivingTime: "Approximately 40 minutes from Sakala Resort",
    distance: "22 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "IDR 10,000/person"
    },
    specialEvents: [],
    features: ["Surfing", "Scenic cove", "Cliff access"],
    images: ["padang-padang-beach.jpg"],
    priority: 6
  },
  {
    id: "balangan-beach",
    name: "Balangan Beach",
    category: "beaches",
    coordinates: [115.124115, -8.791188],
    description: "Quiet beach with golden sands, reef breaks, and dramatic limestone cliffs.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "22 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Sunbathing", "Cliff-top cafes"],
    images: ["balangan-beach.jpg"],
    priority: 7
  },
  {
    id: "dreamland-beach",
    name: "Dreamland Beach",
    category: "beaches",
    coordinates: [115.117851, -8.799306],
    description: "Popular for its white sands, surf breaks, and stunning sunset views.",
    drivingTime: "Approximately 40 minutes from Sakala Resort",
    distance: "23 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Beach clubs", "Sunset viewing"],
    images: ["dreamland-beach.jpg"],
    priority: 8
  },
  {
    id: "bingin-beach",
    name: "Bingin Beach",
    category: "beaches",
    coordinates: [115.113237, -8.805392],
    description: "Cliff-top beach with surf breaks and a laid-back vibe.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "24 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Beach shacks", "Cliffside views"],
    images: ["bingin-beach.jpg"],
    priority: 9
  },
  {
    id: "suluban-beach",
    name: "Suluban Beach (Blue Point)",
    category: "beaches",
    coordinates: [115.0885532, -8.8150984],
    description: "Hidden beach accessed via stairs down limestone cliffs, popular with photographers.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "25 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Sea cave access", "Scenic cliffs"],
    images: ["suluban-beach.jpg"],
    priority: 10
  },
  {
    id: "nyang-nyang-beach",
    name: "Nyang Nyang Beach",
    category: "beaches",
    coordinates: [115.093538, -8.839312],
    description: "Secluded beach with pristine sands, accessed by a steep descent through the jungle.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "24 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Seclusion", "Natural scenery", "Cliff walks"],
    images: ["nyang-nyang-beach.jpg"],
    priority: 11
  },
  {
    id: "green-bowl-beach",
    name: "Green Bowl Beach",
    category: "beaches",
    coordinates: [115.170922, -8.848688],
    description: "Hidden beach famous for its green waters and hole-through-the-cliff formation.",
    drivingTime: "Approximately 55 minutes from Sakala Resort",
    distance: "27 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Lagoon", "Cliff views", "Sea caves"],
    images: ["green-bowl-beach.jpg"],
    priority: 12
  },
  {
    id: "melasti-beach",
    name: "Melasti Beach",
    category: "beaches",
    coordinates: [115.161720, -8.849206],
    description: "Dramatic cliff-top beach with clear waters and spiritual cleansing sites.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Cliffside views", "Rock formations", "Sunny dunes"],
    images: ["melasti-beach.jpg"],
    priority: 13
  },
  {
    id: "tegal-wangi-beach",
    name: "Cliff Jump Tegal Wangi Beach",
    category: "beaches",
    coordinates: [115.144593, -8.779676],
    description: "Hidden cove with natural jacuzzis and sunset viewpoints.",
    drivingTime: "Approximately 30 minutes from Sakala Resort",
    distance: "16 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Natural pools", "Sunset views", "Cliff access"],
    images: ["tegal-wangi-beach.jpg"],
    priority: 14
  },
  {
    id: "padang-bai-beach",
    name: "Padang Bai Beach",
    category: "beaches",
    coordinates: [115.510587, -8.530416],
    description: "Gateway port beach with calm waters and snorkeling spots.",
    drivingTime: "Approximately 1 hour 15 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Snorkeling", "Boat trips", "White sand"],
    images: ["padang-bai-beach.jpg"],
    priority: 15
  },
  {
    id: "virgin-beach",
    name: "Virgin Beach (White Sandy Beach)",
    category: "beaches",
    coordinates: [115.611639, -8.498553],
    description: "Secluded white-sand beach with crystal clear waters and coral reefs.",
    drivingTime: "Approximately 1 hour 15 minutes from Sakala Resort",
    distance: "62 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Coral reefs", "Seclusion", "Snorkeling"],
    images: ["virgin-beach.jpg"],
    priority: 16
  },
  {
    id: "keramas-beach",
    name: "Keramas Beach",
    category: "beaches",
    coordinates: [115.339098, -8.597792],
    description: "World-class surf break with black sand and big waves.",
    drivingTime: "Approximately 40 minutes from Sakala Resort",
    distance: "25 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Surfing", "Beach bars"],
    images: ["keramas-beach.jpg"],
    priority: 17
  },
  {
    id: "amed-beach",
    name: "Amed Beach",
    category: "beaches",
    coordinates: [115.651455, -8.334859],
    description: "Quiet fishing village beach known for diving and black volcanic sands.",
    drivingTime: "Approximately 3 hours from Sakala Resort",
    distance: "120 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Diving", "Snorkeling", "Black sand"],
    images: ["amed-beach.jpg"],
    priority: 18
  },
  {
    id: "lovina-beach",
    name: "Lovina Beach",
    category: "beaches",
    coordinates: [115.024437, -8.161002],
    description: "Black sand beach known for calm waters, dolphin watching, and hot springs.",
    drivingTime: "Approximately 3 hours 30 minutes from Sakala Resort",
    distance: "130 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "Free"
    },
    specialEvents: [],
    features: ["Dolphin watching", "Hot springs", "Black sand", "Calm waters"],
    images: ["lovina-beach.jpg"],
    priority: 19
  },
  {
    id: "menjangan-beach",
    name: "Menjangan Beach",
    category: "beaches",
    coordinates: [114.561991, -8.136507],
    description: "Remote coral-fringed beach in West Bali National Park, ideal for snorkeling.",
    drivingTime: "Approximately 4 hours 30 minutes from Sakala Resort",
    distance: "160 km",
    operatingHours: "Open 24/7",
    pricing: {
      entry: "IDR 100,000/person (park fee)"
    },
    specialEvents: [],
    features: ["Snorkeling", "Coral reefs", "Wildlife spotting"],
    images: ["menjangan-beach.jpg"],
    priority: 20
  },
  // Beach Clubs
  {
    id: "sakala-beach-club",
    name: "Sakala Beach Club",
    category: "beach-clubs",
    coordinates: [115.222176, -8.759364], // Sakala Resort Bali (Tanjung Benoa)
    description: "Beach club within Sakala Resort Bali offering beachfront dining, infinity pool, and bar services.",
    drivingTime: "Starting point",
    distance: "0 km",
    operatingHours: "9:00 AM - 10:00 PM daily",
    pricing: { entry: "IDR 200,000/person", food: "Various options available" },
    specialEvents: [],
    features: ["Beachfront bar", "Infinity pool", "Live music", "Beach loungers"],
    images: ["sakala-beach-club.jpg"],
    priority: 1
  },
  {
    id: "reef-beach-club",
    name: "Reef Beach Club",
    category: "beach-clubs",
    coordinates: [115.218833, -8.830094], // Reef Beach Club (Peninsula Beach Nusa Dua) - CORRECT
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
    coordinates: [115.140676, -8.846472], // OMNIA Dayclub (now Savaya Bali) - CORRECT
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
    coordinates: [115.091811, -8.813902], // Ulu Cliff House (Uluwatu) - CORRECT
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
    coordinates: [115.148592, -8.846173], // Sundays Beach Club (Pecatu, below Ungasan Clifftop Resort) - CORRECT
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
    coordinates: [115.139206, -8.666888], // Canggu
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
    coordinates: [115.160670, -8.848257], // Pecatu
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
    coordinates: [115.139091, -8.665198], // Seminyak
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
    coordinates: [115.141182, -8.668675], // Uluwatu
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
    coordinates: [115.144408, -8.670695], // Canggu
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
    coordinates: [115.188236, -8.844012], // Canggu
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
    id: "mrs-sippy-seminyak",
    name: "Mrs Sippy, Seminyak",
    category: "beach-clubs",
    coordinates: [115.151101, -8.679833], // Seminyak
    description: "Popular pool club known for its tiered saltwater pool, daybeds, and social atmosphere.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 12:00 AM daily",
    pricing: { entry: "IDR 150,000/person" },
    specialEvents: [],
    features: ["Saltwater pool", "Daybeds", "Social events"],
    images: ["mrs-sippy-seminyak.jpg"],
    priority: 14
  },
  {
    id: "the-lawn-canggu",
    name: "The Lawn, Canggu",
    category: "beach-clubs",
    coordinates: [115.129612, -8.658512], // Canggu
    description: "Laid-back beachfront bar with daybeds, cocktails, and sunset sessions.",
    drivingTime: "Approximately 50 minutes from Sakala Resort",
    distance: "45 km",
    operatingHours: "8:00 AM - 11:00 PM daily",
    pricing: { entry: "IDR 150,000/person" },
    specialEvents: [],
    features: ["Daybeds", "Sunset sessions", "Cocktails"],
    images: ["the-lawn-canggu.jpg"],
    priority: 15
  },
  {
    id: "potato-head-seminyak",
    name: "Potato Head Beach Club",
    category: "beach-clubs",
    coordinates: [115.149881, -8.679512], // Seminyak
    description: "Iconic beach club featuring an ocean pool, music events, and global cuisine.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 12:00 AM daily",
    pricing: { entry: "IDR 300,000/person" },
    specialEvents: [],
    features: ["Ocean pool", "Music events", "Global cuisine"],
    images: ["potato-head-beach-club.jpg"],
    priority: 16
  },
  {
    id: "jungle-fish-ubud",
    name: "Jungle Fish, Ubud",
    category: "beach-clubs",
    coordinates: [115.260156, -8.479136], // Ubud
    description: "Cliff-top pool venue set amid jungle scenery with hanging bridge access.",
    drivingTime: "Approximately 1 hour 30 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "8:00 AM - 7:00 PM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Cliff-top pool", "Jungle views", "Hanging bridge"],
    images: ["jungle-fish-ubud.jpg"],
    priority: 17
  },  
  {
    id: "wanna-jungle-pool-and-bar-ubud",
    name: "Wanna Jungle Pool and Bar, Ubud",
    category: "beach-clubs",
    coordinates: [115.274997, -8.423106], // Ubud
    description: "Rustic jungle pool bar featuring natural pools, swing seats, and wooden decks.",
    drivingTime: "Approximately 1 hour 30 minutes from Sakala Resort",
    distance: "60 km",
    operatingHours: "8:00 AM - 7:00 PM daily",
    pricing: { entry: "IDR 150,000/person" },
    specialEvents: [],
    features: ["Natural pools", "Swing seats", "Jungle ambiance"],
    images: ["wanna-jungle-pool-and-bar-ubud.jpg"],
    priority: 18
  },
  {
    id: "cocoon-day-club-seminyak",
    name: "Cocoon Day Club, Seminyak",
    category: "beach-clubs",
    coordinates: [115.1617999, -8.6974008], // Seminyak
    description: "Luxurious day club with ocean view pool, VIP cabanas, and DJ parties.",
    drivingTime: "Approximately 35 minutes from Sakala Resort",
    distance: "20 km",
    operatingHours: "10:00 AM - 6:00 PM daily",
    pricing: { entry: "IDR 400,000/person" },
    specialEvents: [],
    features: ["Ocean view pool", "VIP cabanas", "DJ parties"],
    images: ["cocoon-day-club-seminyak.jpg"],
    priority: 19
  },
  {
    id: "white-rock-beach-club-ungasan",
    name: "White Rock Beach Club, Ungasan",
    category: "beach-clubs",
    coordinates: [115.156968, -8.848096], // Ungasan
    description: "Serene beach club at the base of cliffs offering daybeds and sunset cocktails.",
    drivingTime: "Approximately 45 minutes from Sakala Resort",
    distance: "23 km",
    operatingHours: "9:00 AM - 9:00 PM daily",
    pricing: { entry: "IDR 200,000/person" },
    specialEvents: [],
    features: ["Cliff-base daybeds", "Sunset cocktails", "Beach access"],
    images: ["white-rock-beach-club-ungasan.jpg"],
    priority: 20
  },
  {
    id: "canna-bali",
    name: "Canna Bali",
    category: "beach-clubs",
    coordinates: [115.2135687, -8.8332141], // Nusa Dua
    description: "Elegant beachfront club with infinity pool, fine dining, and daybeds.",
    drivingTime: "Approximately 10 minutes from Sakala Resort",
    distance: "3 km",
    operatingHours: "10:00 AM - 10:00 PM daily",
    pricing: { entry: "IDR 300,000/person" },
    specialEvents: [],
    features: ["Infinity pool", "Fine dining", "Daybeds"],
    images: ["canna-bali.jpg"],
    priority: 21
  },
  {
    id: "rock-bar-ayana-jimbaran",
    name: "Rock Bar at AYANA, Jimbaran",
    category: "beach-clubs",
    coordinates: [115.1375829, -8.7849944], // Jimbaran
    description: "Romantic beachfront dining club under lantern-lit bamboo huts.",
    drivingTime: "Approximately 20 minutes from Sakala Resort",
    distance: "12 km",
    operatingHours: "6:00 PM - 10:00 PM daily",
    pricing: { dining: "IDR 500,000/person" },
    specialEvents: [],
    features: ["Beachfront huts", "Fine dining", "Romantic ambiance"],
    images: ["rock-bar-ayana-jimbaran.jpg"],
    priority: 22
  },
  
  // Water Sports
  {
    id: "bali-water-sport-tanjung-benoa",
    name: "Bali Water Sport Tanjung Benoa",
    category: "water-sports",
    coordinates: [115.222791, -8.759803], // Tanjung Benoa Water Sports (Tanjung Benoa) - CORRECT
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
    images: ["bali-water-sport-tanjung-benoa.jpg"],
    priority: 23
  },
  {
    id: "pacific-bahari-water-sports",
    name: "Pacific Bahari Water Sports",
    category: "water-sports",
    coordinates: [115.223451, -8.761478], // Nusa Dua Water Sports (Nusa Dua Beach) - CORRECT
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
    images: ["pacific-bahari-water-sports.jpg"],
    priority: 9
  },
  {
    id: "padang-bai-coral-restoration",
    name: "Padang Bai Livingseas Coral Restoration Site",
    category: "water-sports",
    coordinates: [115.513407, -8.527337],
    description: "Snorkeling and diving site famous for its coral reefs and diverse marine life.",
    drivingTime: "Approximately 1 hour from Sakala Resort",
    distance: "60 km",
    operatingHours: "7:00 AM - 5:00 PM daily",
    pricing: {
      snorkeling: "IDR 300,000/person",
      diving: "IDR 600,000/person",
      equipmentRental: "IDR 100,000/person"
    },
    specialEvents: [],
    features: ["Snorkeling", "Scuba diving", "Coral reef exploration"],
    images: ["padang-bai-coral-restoration-site.jpg"],
    priority: 24
  },
  {
    id: "manta-point-nusa-penida",
    name: "Manta Point, Nusa Penida",
    category: "water-sports",
    coordinates: [115.5258607, -8.7941828],
    description: "World-renowned dive site for encounters with manta rays in the clear waters off Nusa Penida.",
    drivingTime: "Approximately 2 hours from Sakala Resort (including boat transfer)",
    distance: "40 km",
    operatingHours: "7:00 AM - 5:00 PM daily",
    pricing: {
      diveBoat: "IDR 1,200,000/person",
      equipmentRental: "IDR 200,000/person"
    },
    specialEvents: [],
    features: ["Scuba diving", "Manta ray sightings", "Underwater photography"],
    images: ["manta-point-nusa-penida.jpg"],
    priority: 25
  },
  {
    id: "tulamben-shipwreck",
    name: "USAT Liberty Shipwreck, Tulamben",
    category: "water-sports",
    coordinates: [115.593318, -8.274048],
    description: "Historic shipwreck dive site offering vibrant coral growth and a variety of marine species.",
    drivingTime: "Approximately 3 hours from Sakala Resort",
    distance: "95 km",
    operatingHours: "24/7 (diving tours available throughout the day)",
    pricing: {
      diveSiteFee: "IDR 150,000/person",
      guidedDive: "IDR 500,000/person",
      equipmentRental: "IDR 200,000/person"
    },
    specialEvents: [],
    features: ["Scuba diving", "Wreck exploration", "Macro photography"],
    images: ["tulamben-shipwreck.jpg"],
    priority: 26
  },
  // Cultural Sites
  {
    id: "museum-pasifika",
    name: "Museum PASIFIKA",
    category: "cultural",
    coordinates: [115.230542, -8.800075], // Museum PASIFIKA (Nusa Dua, ITDC area) - CORRECT
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
    coordinates: [115.219688, -8.7537085], // Caow Eng Bio Temple (Tanjung Benoa) - CORRECT
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
  {
    id: "besakih-great-temple",
    name: "Besakih Great Temple",
    category: "cultural",
    coordinates: [115.452407, -8.373815], // Pura Besakih (Mother Temple)
    description: "The largest and holiest Hindu temple in Bali, located on the slopes of Mount Agung.",
    drivingTime: "Approximately 2 hours 30 minutes from Sakala Resort",
    distance: "96 km",
    operatingHours: "7:00 AM - 6:00 PM daily",
    pricing: { entry: "IDR 60,000/person" },
    specialEvents: [],
    features: ["Largest temple complex", "Mountain views", "Ceremonial halls"],
    images: ["pura-besakih.jpg"],
    priority: 12
  },
  {
    id: "lempuyang-temple",
    name: "Lempuyang Temple",
    category: "cultural",
    coordinates: [115.6289024, -8.3918923], // Pura Lempuyang Luhur
    description: "One of Bali's oldest temples, offering the iconic 'Gate of Heaven' views of Mount Agung.",
    drivingTime: "Approximately 2 hours from Sakala Resort",
    distance: "85 km",
    operatingHours: "6:00 AM - 7:00 PM daily",
    pricing: { entry: "IDR 30,000/person" },
    specialEvents: [],
    features: ["Gate of Heaven", "Mountain scenery", "Ancient shrine"],
    images: ["pura-lempuyang.jpg"],
    priority: 13
  },
  {
    id: "ulun-danu-beratan-temple",
    name: "Ulun Danu Beratan Temple",
    category: "cultural",
    coordinates: [115.166780, -8.275178], // Pura Ulun Danu Bratan
    description: "A lakeside water temple on Lake Bratan, known for its beautiful reflection views.",
    drivingTime: "Approximately 2 hours 30 minutes from Sakala Resort",
    distance: "85 km",
    operatingHours: "8:00 AM - 6:00 PM daily",
    pricing: { entry: "IDR 50,000/person" },
    specialEvents: [],
    features: ["Lake temple", "Reflection photography", "Floating shrines"],
    images: ["ulun-danu-beratan.jpg"],
    priority: 14
  },
  {
    id: "tirta-empul-temple",
    name: "Tirta Empul Temple",
    category: "cultural",
    coordinates: [115.3152709, -8.4155156], // Pura Tirta Empul
    description: "A holy water temple famous for its purification baths fed by natural springs.",
    drivingTime: "Approximately 2 hours from Sakala Resort",
    distance: "78 km",
    operatingHours: "9:00 AM - 5:00 PM daily",
    pricing: { entry: "IDR 15,000/person" },
    specialEvents: [],
    features: ["Holy spring baths", "Purification rituals", "Sacred fish ponds"],
    images: ["tirta-empul.jpg"],
    priority: 15
  },
  {
    id: "tirta-gangga-water-gardens",
    name: "Tirta Gangga Water Gardens",
    category: "cultural",
    coordinates: [115.587072, -8.412252], // Tirta Gangga
    description: "A former royal palace with tiered fountains, stone carvings, and lush gardens.",
    drivingTime: "Approximately 2 hours from Sakala Resort",
    distance: "90 km",
    operatingHours: "8:00 AM - 5:00 PM daily",
    pricing: { entry: "IDR 50,000/person" },
    specialEvents: [],
    features: ["Royal water gardens", "Stone sculptures", "Ornamental fountains"],
    images: ["tirta-gangga.jpg"],
    priority: 16
  },
  {
    id: "ujung-water-palace",
    name: "Ujung Water Palace",
    category: "cultural",
    coordinates: [115.630776, -8.463856], // Taman Soekasada Ujung
    description: "A historic water palace featuring European-style gardens and coastal views.",
    drivingTime: "Approximately 2 hours 20 minutes from Sakala Resort",
    distance: "100 km",
    operatingHours: "9:00 AM - 6:00 PM daily",
    pricing: { entry: "IDR 15,000/person" },
    specialEvents: [],
    features: ["European gardens", "Seaside pavilions", "Scenic boardwalks"],
    images: ["ujung-water-palace.jpg"],
    priority: 17
  },
  {
    id: "puri-agung-karangasem",
    name: "Puri Agung Karangasem",
    category: "cultural",
    coordinates: [115.616383, -8.443636], // Puri Agung Karangasem
    description: "The royal palace of the Karangasem kingdom, showcasing Balinese architecture and murals.",
    drivingTime: "Approximately 2 hours 15 minutes from Sakala Resort",
    distance: "95 km",
    operatingHours: "9:00 AM - 5:00 PM daily",
    pricing: { entry: "IDR 15,000/person" },
    specialEvents: [],
    features: ["Royal architecture", "Balinese murals", "Historical pavilions"],
    images: ["puri-agung-karangasem.jpg"],
    priority: 18
  },
  // Balinese Traditional Villages
  {
    id: "penglipuran-village",
    name: "Penglipuran Village",
    category: "traditional-villages",
    coordinates: [115.359253, -8.422237],
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
    coordinates: [115.566142, -8.476754],
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
