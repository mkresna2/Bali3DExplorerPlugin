# Bali 3D Explorer

A web-based 3D visualization of Bali featuring top tourist destinations, beach clubs, and attractions with Sakala Resort Bali as the focal point.

## Features

- Interactive 3D map of Bali using Three.js and MapLibre GL JS
- Categorized list of tourist destinations in the left sidebar
- Detailed information cards for each location including:
  - Pricing details
  - Operating hours
  - Special events
  - Approximate driving time from Sakala Resort
  - Distance information
  - Key features
- Mobile-responsive design with elegant UI matching Sakala Resort's color scheme
- Interactive navigation to fly to destinations when clicked

## Setup Instructions

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic web server (can use Live Server extension in VS Code or any other simple HTTP server)

### Configuration

1. Add actual images for destinations in the `assets/images/` directory:
   - sakala-resort.jpg
   - bali-cliff.jpg
   - uluwatu-temple.jpg
   - reef-beach-club.jpg
   - omnia-dayclub.jpg
   - ulu-cliff-house.jpg
   - sundays-beach-club.jpg
   - tanjung-benoa-watersports.jpg
   - nusa-dua-watersports.jpg
   - museum-pasifika.jpg
   - caow-eng-bio-temple.jpg

2. (Optional) Add a logo image at `assets/images/logo.png`

### Running the Application

1. Serve the project directory using a web server
2. Open the application in your browser
3. Explore the 3D visualization of Bali!

## Project Structure

```
bali-3d-explorer/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   ├── main.js             # Core application logic
│   ├── three-config.js     # Three.js configuration
│   ├── threebox-config.js  # ThreeLibre configuration
│   ├── destinations.js     # Destination data
│   └── ui-controls.js      # UI interaction handlers
├── assets/
│   ├── images/             # Images for destinations
│   ├── models/             # 3D models (if needed)
│   └── textures/           # Textures for 3D models
└── libs/                   # External libraries
```

## Customization

### Adding New Destinations

To add new destinations, edit the `destinations.js` file and add a new object to the `destinations` array following the existing format:

```javascript
{
  id: "unique-id",
  name: "Destination Name",
  category: "category-name", // featured, beach-clubs, water-sports, or cultural
  coordinates: [longitude, latitude],
  description: "Description text...",
  drivingTime: "X minutes from Sakala Resort",
  distance: "X km",
  operatingHours: "Opening hours information",
  pricing: {
    entry: "Price information",
    // Other pricing details...
  },
  specialEvents: [
    {
      name: "Event Name",
      schedule: "Event schedule",
      price: "Event price"
    }
  ],
  features: ["Feature 1", "Feature 2", "Feature 3"],
  images: ["image-filename.jpg"],
  priority: 12 // Display order priority
}
```

### Modifying the 3D Visualization

The 3D visualization can be customized in the following files:

- `three-config.js`: For direct Three.js implementation
- `threebox-config.js`: For MapLibre/ThreeLibre implementation

### Styling Changes

To modify the appearance:

- Edit `styles.css` to change colors, layout, and responsive behavior
- Update the color variables at the top of the CSS file to match a different color scheme

## Technologies Used

- Three.js - 3D rendering
- MapLibre GL JS - Open-source map visualization
- ThreeLibre - Integration between Three.js and MapLibre GL JS
- HTML5/CSS3 - Structure and styling
- JavaScript (ES6+) - Application logic

## Future Enhancements

Potential improvements for the project:

- Add more detailed 3D models for key landmarks
- Implement a tour feature that automatically navigates between destinations
- Add animation effects for water sports activities
- Integrate real-time weather data
- Add language selection for multilingual support
- Implement augmented reality features for mobile devices

## License

This project is created for demonstration purposes.

## Acknowledgements

- Sakala Resort Bali for inspiration
- Three.js and MapLibre for visualization technologies
