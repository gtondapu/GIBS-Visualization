import React from 'react';
import Select from 'react-select';

const EventSelector = ({ events, onSelect, selectedEvent }) => {
    const options = events.map(e => ({
        value: e.id,
        label: e.name,
        coordinates: [e.latitude, e.longitude],
    }));

    const handleChange = (selectedOption) => {
        onSelect(selectedOption);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            value={selectedEvent}
            placeholder="Select or search event..."
            isClearable
        />
    );
};

export default EventSelector;
