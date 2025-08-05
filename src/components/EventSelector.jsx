import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const EventSelector = ({ onSelect }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const options = events.map((event, index) => ({
        value: index,
        label: `${event.event_name} (${event.date})`,
        data: event,
    }));

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
