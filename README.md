# GIBS-Visualization

**GIBS-Visualization** is a React-based web app that visualizes NASA’s GIBS layers on a Leaflet map. It displays the **OPERA_L3_Dynamic_Surface_Water_Extent-HLS** dynamic surface water extent layer, with interactive controls to customize the view.

## Features

- **Layer Toggle:** Turn the OPERA surface water extent layer on/off
- **Date Picker:** Select a date to load the layer for that specific day
- **Basemap Selector:** Choose from multiple basemaps for the map background
- **Event Selector:** Select and highlight events loaded from a JSON data source
- **Layer Style Selector:** Change the styling of the active layer dynamically
- Interactive map with zoom and pan using Leaflet
- Responsive UI with React and Bootstrap

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

## Usage

- Use the **Layer Toggle** to show or hide the `OPERA_L3_Dynamic_Surface_Water_Extent-HLS` layer.
- Pick a date via the **Date Picker** to load the imagery corresponding to that date.
- Change the basemap using the **Basemap Selector** dropdown.
- Select an event from the **Event Selector** to focus on specific geographic or temporal data.
- Adjust the layer’s appearance through the **Layer Style Selector**.

## Project Structure

- `src/` — Main source code including React components and styles
- `components/` — Reusable React components like Map, Controls, and Selectors
- `data/` — JSON files containing event data for the Event Selector
- `public/` — Static assets such as icons and favicon

## Dependencies

- React
- Leaflet & react-leaflet
- Bootstrap
- Date picker component (e.g., react-datepicker)


  
  
