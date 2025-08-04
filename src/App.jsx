import MapView from './components/MapView';
import FloatingPanel from './components/FloatingPanel';
import { useEffect, useState } from 'react';
import './index.css';

function App() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showGIBS, setShowGIBS] = useState(true);
    const [selectedDate, setSelectedDate] = useState('2023-07-30'); // default GIBS date
    const [colorStyle, setColorStyle] = useState('normal');
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

    return (
        <div className="app">
            <header className="bg-dark text-white p-2 text-center">
                <h1 className="fs-4">GIBS Layer Visualization</h1>
            </header>
            <div className="map-container position-relative">
                <MapView showGIBS={showGIBS} selectedDate={selectedDate} colorStyle={colorStyle} selectedEvent={selectedEvent}  />
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

                />

            </div>
        </div>
    );
}

export default App;
