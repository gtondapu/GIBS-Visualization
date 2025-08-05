/**
 * FloatingPanel.jsx
 * This component renders a floating control panel on the Leaflet map.
 * It includes controls like layer toggle, date picker, basemap selector, event selector, and style selector,
 * and supports expand/collapse behavior.
 *
 */
import '../assets/styles/FloatingPanel.css';
import EventSelector from './../components/EventSelector';
import BasemapSelector from './../components/BasemapSelector';

const FloatingPanel = ({
                           showGIBS, setShowGIBS, selectedDate, setSelectedDate,
                           colorStyle, setColorStyle, selectedEvent, handleEventSelect,
                           selectedBasemap, setSelectedBasemap, isOpen, setIsOpen
                       }) => (

    <div className="floating-panel card shadow-sm p-3 position-absolute">

        {/*Header for floating panel*/}
        <h6>Map Controls <span className="map-control-header float-end" onClick={() => setIsOpen(!isOpen)}>
           <a href="#" className="text-decoration-none text-black"> {isOpen ? "▲" : "▼"}</a>
        </span></h6>

        {isOpen && (
            <div>
                {/*Layer selection*/}
                <div className="form-check pb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={showGIBS}
                        onChange={(e) => setShowGIBS(e.target.checked)}
                        id="gibsCheck"
                    />
                    <label className="form-check-label" htmlFor="gibsCheck">
                        HLS S30 Adjusted Reflectance
                    </label>
                </div>

                {/*Basemap selection*/}
                <div style={{flex: 1}} className="mb-2">
                    <BasemapSelector current={selectedBasemap} onChange={setSelectedBasemap}/>
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

                {/*Map overlay color selection*/}
                <div className="mb-2">
                    <label htmlFor="colorStyleSelect" className="form-label">Overlay Color Style</label>
                    <select
                        id="colorStyleSelect"
                        className="form-select pb-2"
                        value={colorStyle}
                        onChange={e => setColorStyle(e.target.value)}
                        disabled={!showGIBS}
                    >
                        <option value="normal">Default</option>
                        <option value="grayscale">Grayscale</option>
                        <option value="inverted">Inverted</option>
                        <option value="falsecolor">False Color</option>
                        <option value="sepia">Sepia</option>
                    </select>
                </div>

                {/*Event selection*/}
                <div>
                    <EventSelector onSelect={handleEventSelect}/>

                    {selectedEvent && (
                        <>
                            <p>
                                <strong>{selectedEvent.event_name}</strong> ({selectedEvent.date})
                            </p>
                            <img
                                src={selectedEvent.thumbnail}
                                alt="Event Thumbnail"
                                style={{maxWidth: '270px'}}
                            />
                        </>
                    )}
                </div>
            </div>
        )}
    </div>
);

export default FloatingPanel;
