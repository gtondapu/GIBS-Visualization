# GIBS-Visualization

**GIBS-Visualization** is a React-based web app that visualizes NASA’s GIBS layers on a Leaflet map. It displays the **HLS_S30_Nadir_BRDF_Adjusted_Reflectance** layer, with interactive controls to customize the view.

## Features

- **Layer Toggle:** Turn the HLS_S30_Nadir_BRDF_Adjusted_Reflectance layer on/off
- **Date Picker:** Select a date to load the layer for that specific day
- **Basemap Selector:** Choose from multiple basemaps for the map background
- **Event Selector:** Select and highlight events loaded from a JSON data source
- **Layer Style Selector:** Change the styling of the active layer dynamically
- Banner notification when no data is available for selected date
- Interactive map with zoom and pan using Leaflet
- Responsive UI with React and Bootstrap

## Prerequisites

- Node.js (v14 or above recommended)
- npm or yarn

## Installation

1. Clone the repository:
   `git clone https://github.com/gtondapu/GIBS-Visualization.git`
2. Enter the cloned directory:
   `cd GIBS-Visualization`
3. Install dependencies:
    `npm install`
4. Start the development server:
    `npm run dev`
5. Open your browser and go to:
    `http://localhost:3000` (3000 or any port your terminal mentions)

## Configuration
- This project includes a configuration directory (src/config/) that holds metadata for NASA GIBS layers in the file gibsLayers.js.

- Contains an array of objects representing available GIBS WMTS layers.

- Each layer object includes:

  - id: A unique identifier for internal use.

  - name: The official NASA GIBS layer name matching WMTS GetCapabilities.

  - urlTemplate: The WMTS tile URL pattern with a {date} placeholder to be replaced dynamically.

  - maxZoom: Maximum zoom level supported by the layer.

## Usage

- Use the **Layer Toggle** to show or hide the `HLS_S30_Nadir_BRDF_Adjusted_Reflectance` layer.
- Pick a date via the **Date Picker** to load the imagery corresponding to that date.
- Change the basemap using the **Basemap Selector** dropdown.
- Select an event from the **Event Selector** to focus on specific geographic or temporal data.
- Adjust the layer’s appearance through the **Layer Style Selector**.

## No Data Handling
- If no overlay imagery is available for the selected date, a banner notification will appear informing the user:
No data available for {selectedDate}
- This banner can be dismissed by clicking the close button

## Project Structure
```
GIBS-Visualization/
├── public/ # Static files (preloaded_events.json)
├── src/
│ ├── assets/ # CSS styles, images, and other static assets
│ ├── components/ # React components
│ │ ├── BaseMapSelector.jsx
│ │ ├── EventSelector.jsx
│ │ ├── FloatingPanel.jsx
│ │ ├── FlyToBounds.jsx
│ │ └── MapView.jsx
│ ├── config/ # Configuration files (e.g., gibsLayers.js)
│ ├── App.jsx # Main app component
│ └── index.jsx # React app entry point
├── .gitignore # Git ignore rules
├── package.json # NPM dependencies and scripts
└── README.md # Project documentation
```

## Dependencies

- React
- Leaflet & react-leaflet
- Bootstrap
- Date picker component (e.g., react-datepicker)


  
  
