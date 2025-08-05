import MapView from './components/MapView';
import FloatingPanel from './components/FloatingPanel';
import { useEffect, useState } from 'react';
import './index.css';
import BasemapSelector from './components/BasemapSelector';
function App() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showGIBS, setShowGIBS] = useState(true);
    const [selectedDate, setSelectedDate] = useState('2023-07-30'); // default GIBS date
    const [colorStyle, setColorStyle] = useState('normal');
    const [selectedBasemap, setSelectedBasemap] = useState('osm');
    useEffect(() => {
        fetch('/events.json') // replace with your JSON file path
            .then(res => res.json())
            .then(data => {
                setEvents(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);
    const handleEventSelect = (event) => {
        if (!event) return;
        setSelectedEvent(event);
    };

    return (
        <div className="app">
            <header className="bg-dark text-white p-2 text-center">
                <h1 className="fs-4">GIBS Layer Visualization</h1>
            </header>
            <div className="map-container position-relative">

                <MapView
                    boundingBox={selectedEvent?.bounding_box}
                    geojson={selectedEvent?.geojson}
                    showGIBS={showGIBS} selectedDate={selectedDate} colorStyle={colorStyle} selectedEvent={selectedEvent}  selectedBasemap={selectedBasemap} />
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
                    loading={loading}
                    error={error}
                    handleEventSelect={handleEventSelect}
                    selectedBasemap={selectedBasemap}
                    setSelectedBasemap={setSelectedBasemap}
                />

            </div>
        </div>
    );
}

export default App;
