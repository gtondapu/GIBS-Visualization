/**
 * Author: Githika Tondapu
 * Created: 8/4/2025
 *
 * App.jsx
 *
 * Root React component for the GIBS-Visualization app.
 * - Initializes Leaflet MapView
 * - Initializes FloatingPanel
 * - Manages high-level state
 * - Renders map control and floating panel
 *
 */
import MapView from './components/MapView';
import FloatingPanel from './components/FloatingPanel';
import {useState} from 'react';
import './index.css';
import { gibsLayers } from "./config/gibsLayers";

function App() {
    const [events] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showGIBS, setShowGIBS] = useState(true);
    const [selectedDate, setSelectedDate] = useState('2023-07-30'); // default GIBS date
    const [colorStyle, setColorStyle] = useState('normal');
    const [selectedBasemap, setSelectedBasemap] = useState('osm');
    const [isOpen, setIsOpen] = useState(true);
    const [selectedLayerId, setSelectedLayerId] = useState("HLS_S30");

    const handleEventSelect = (event) => {
        if (!event) return;
        setSelectedEvent(event);
    };
    const selectedLayer = gibsLayers.find(layer => layer.id === selectedLayerId);


    return (
        <div className="app">
            <header className="bg-dark text-white p-2 text-center">
                <h1 className="fs-4">GIBS Layer Visualization</h1>
            </header>
            <div className="map-container position-relative">
                <MapView
                    boundingBox={selectedEvent?.bounding_box}
                    geojson={selectedEvent?.geojson}
                    showGIBS={showGIBS}
                    selectedDate={selectedDate}
                    colorStyle={colorStyle}
                    selectedEvent={selectedEvent}
                    selectedBasemap={selectedBasemap}
                    gibsLayer={selectedLayer}
                    selectedLayerId={selectedLayerId}/>
                <FloatingPanel
                    showGIBS={showGIBS}
                    setShowGIBS={setShowGIBS}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    colorStyle={colorStyle}
                    setColorStyle={setColorStyle}
                    events={events}
                    setSelectedEvent={setSelectedEvent}
                    selectedEvent={selectedEvent}
                    handleEventSelect={handleEventSelect}
                    selectedBasemap={selectedBasemap}
                    setSelectedBasemap={setSelectedBasemap}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

            </div>
        </div>
    );
}

export default App;
