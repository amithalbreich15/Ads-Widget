# Taboola Recommendation Widget

A responsive recommendation widget that integrates with the Taboola REST API to display both organic and sponsored content recommendations.

## Features

- Responsive design that adapts to different screen sizes (desktop/mobile)
- Supports both sponsored and organic content types
- Extensible architecture for adding new recommendation types in the future
- Built-in testing functionality
- Clean object-oriented code organization

## Project Structure

```
TaboolaAdWidget/
├── index.html              # Main HTML file
├── README.md               # Project documentation
├── css/
│   └── styles.css          # All styling for the widget
├── js/
│   ├── main.js             # Application initialization
│   ├── config.js           # Configuration settings
│   ├── services/
│   │   └── RecommendationService.js  # Handles API interactions
│   ├── models/
│   │   ├── BaseRecommendation.js     # Base recommendation class
│   │   ├── SponsoredRecommendation.js # Sponsored content handling
│   │   ├── OrganicRecommendation.js  # Organic content handling
│   │   └── RecommendationFactory.js  # Creates appropriate recommendation objects
│   ├── ui/
│   │   └── RecommendationWidget.js   # UI controller for the widget
│   └── tests/
│       └── WidgetTests.js            # Tests for widget functionality
```

## How to Run

1. Clone or download this repository
2. Open the project folder in VS Code or another code editor
3. For local development, you can use a simple HTTP server:
   - With Python: `python -m http.server`
   - With Node.js: `npx serve`
   - With VS Code: Use the "Live Server" extension
4. Open the browser and navigate to the local server address (typically http://localhost:8000 or http://localhost:5000)

## Testing

The application includes built-in tests that can be run by clicking the "Run Tests" button on the page. These tests verify:

1. API Connection: Tests if the widget can successfully connect to the Taboola API
2. Recommendation Rendering: Tests if recommendations are properly rendered
3. Responsive Layout: Tests if the grid layout adapts to different screen sizes
4. Event Handlers: Tests if click handlers are properly attached to recommendation items

## Extending the Widget

To add a new recommendation type:

1. Create a new class extending `BaseRecommendation` in the models folder
2. Update the `RecommendationFactory` to handle the new type
3. No changes needed to the core widget functionality

## API Information

This widget uses the Taboola REST API with the following parameters:

- Publisher ID: taboola-templates
- API Key: f9040ab1b9c802857aa783c469d0e0ff7e7366e4
- End point: https://api.taboola.com/1.0/json/taboola-templates/recommendations.get
