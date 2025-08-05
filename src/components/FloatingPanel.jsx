import './../FloatingPanel.css';
import EventSelector from './../components/EventSelector';
import BasemapSelector from './../components/BasemapSelector';
const FloatingPanel = ({ showGIBS, setShowGIBS, selectedDate, setSelectedDate,  colorStyle,
                           setColorStyle,events, selectedEvent, handleEventSelect,loading,error,selectedBasemap,setSelectedBasemap }) => (
    <div className="floating-panel card shadow-sm p-3 position-absolute">
        <h6>Map Controls</h6>
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                checked={showGIBS}
                onChange={(e) => setShowGIBS(e.target.checked)}
                id="gibsCheck"
            />

            <label className="form-check-label" htmlFor="gibsCheck">
                OPERA Surface Water - HLS
            </label>
        </div>
        <div style={{ flex: 1 }} >
            <BasemapSelector current={selectedBasemap} onChange={setSelectedBasemap} />
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
        <EventSelector onSelect={handleEventSelect} />

        {selectedEvent && (
            <>
                <p>
                    <strong>{selectedEvent.event_name}</strong> ({selectedEvent.date})
                </p>
                <img
                    src={selectedEvent.thumbnail}
                    alt="Event Thumbnail"
                    style={{ maxWidth: '300px', marginBottom: '10px' }}
                />
            </>
        )}
    </div>
);

export default FloatingPanel;
