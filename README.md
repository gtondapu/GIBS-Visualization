GIBS-Visualization
GIBS-Visualization is a React-based web app that visualizes NASA’s GIBS layers on a Leaflet map. It displays the OPERA_L3_Dynamic_Surface_Water_Extent-HLS dynamic surface water extent layer, with interactive controls to customize the view.

Features
Layer Toggle: Turn the OPERA surface water extent layer on/off

Date Picker: Select a date to load the layer for that specific day

Basemap Selector: Choose from multiple basemaps for the map background

Event Selector: Select and highlight events loaded from a JSON data source

Layer Style Selector: Change the styling of the active layer dynamically

Interactive map with zoom and pan using Leaflet

Responsive UI with React and Bootstrap

Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/gtondapu/GIBS-Visualization.git
cd GIBS-Visualization
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run deve
Open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
Usage
Use the Layer Toggle to show or hide the OPERA_L3_Dynamic_Surface_Water_Extent-HLS layer.

Pick a date via the Date Picker to load the imagery corresponding to that date.

Change the basemap using the Basemap Selector dropdown.

Select an event from the Event Selector to focus on specific geographic or temporal data.

Adjust the layer’s appearance through the Layer Style Selector.

Project Structure
src/ — Main source code including React components and styles

components/ — Reusable React components like Map, Controls, and Selectors

data/ — JSON files containing event data for the Event Selector

public/ — Static assets such as icons and favicon

Dependencies
React

Leaflet & react-leaflet

Bootstrap (CSS framework)

Date picker component (if you use a library like react-datepicker or similar)

Contributing
Contributions, issues, and feature requests are welcome! Feel free to fork and submit pull requests.

License
(Include your license here, e.g., MIT License)

Would you like me to generate this as a markdown file you can add directly to your repo? Or any more features/details you want included?
