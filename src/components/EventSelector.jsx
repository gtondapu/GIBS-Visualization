/**
 * EventSelector.jsx
 *
 * A Leaflet map control that lets the user select an event from a list (loaded from JSON)
 *
 */
import React, {useEffect, useState} from 'react';
import Select from 'react-select';

const EventSelector = ({onSelect}) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch and parse the events from JSON file
    useEffect(() => {
        fetch('/preloaded_events.json')
            .then((res) => res.json())
            .then((data) => {
                setEvents(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load events:', err);
                setLoading(false);
            });
    }, []);

    // creating options for dropdown
    const options = events.map((event, index) => ({
        value: index,
        label: `${event.event_name} (${event.date})`,
        data: event,
    }));

    // On dropdown select, this will be called
    const handleChange = (selectedOption) => {
        if (selectedOption) {
            onSelect(selectedOption.data);
        }
    };

    return (
        <Select
            options={options}
            isLoading={loading}
            placeholder="Search and select an event..."
            onChange={handleChange}
            isClearable
        />
    );
};

export default EventSelector;
