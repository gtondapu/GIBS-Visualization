import './../FloatingPanel.css';
import EventSelector from './../components/EventSelector';

const FloatingPanel = ({ showGIBS, setShowGIBS, selectedDate, setSelectedDate,  colorStyle,
                           setColorStyle,events, selectedEvent, setSelectedEvent,loading,error }) => (
    <div className="floating-panel card shadow-sm p-3 position-absolute">
        <h6>Overlays</h6>
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                checked={showGIBS}
                onChange={(e) => setShowGIBS(e.target.checked)}
                id="gibsCheck"
            />
            <label className="form-check-label" htmlFor="gibsCheck">
                NASA GIBS Water
            </label>
        </div>
        <div className="mb-2">
            <label htmlFor="datePicker" className="form-label">Select Date</label>
            <input
                id="datePicker"
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().slice(0, 10)} // Prevent future dates
            />
        </div>
        <div className="mb-2">
            <label htmlFor="colorStyleSelect" className="form-label">Overlay Color Style</label>
            <select
                id="colorStyleSelect"
                className="form-select"
                value={colorStyle}
                onChange={e => setColorStyle(e.target.value)}
                disabled={!showGIBS}
            >
                <option value="normal">Normal</option>
                <option value="grayscale">Grayscale</option>
                <option value="inverted">Inverted</option>
                <option value="falsecolor">False Color</option>
                <option value="sepia">Sepia</option>
            </select>
        </div>
        {loading && <p>Loading events...</p>}
        {error && <p>Error loading events: {error.message}</p>}
        {!loading && !error && (
            <EventSelector
                events={events}
                onSelect={setSelectedEvent}
                selectedEvent={selectedEvent}
            />
        )}
    </div>
);

export default FloatingPanel;
