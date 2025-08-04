import { MapContainer, TileLayer,Marker, useMap } from 'react-leaflet';
import { useGIBSOverlay } from '../hooks/useGIBSOverlay';
import { useEffect, useState } from 'react';

const MapPanTo = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, 10, { animate: true });
        }
    }, [position, map]);

    return null;
};
const MapView = ({ showGIBS, selectedDate, colorStyle, selectedEvent }) => {
    const defaultPosition = [20, 0]; // default center
    const eventPosition = selectedEvent ? selectedEvent.coordinates : null;
    const gibs = useGIBSOverlay({ enabled: showGIBS, date: selectedDate  });
    const filterMap = {
        normal: 'none',
        grayscale: 'grayscale(100%)',
        inverted: 'invert(100%)',
        falsecolor: 'hue-rotate(200deg) saturate(2) brightness(1.1)',
        sepia: 'sepia(60%) saturate(2)',
    };

    const applyColorFilter = (event) => {
        console.log('Applying filter', colorStyle);
        const tileImg = event.tile; // This is the <img> element of the tile
        if (tileImg && tileImg.style) {
            tileImg.style.filter = filterMap[colorStyle] || 'none';
        }
    };

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {showGIBS && (
                <TileLayer
                    key={colorStyle} // force remount on style change
                    url={`https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/OPERA_L3_Dynamic_Surface_Water_Extent-HLS/default/${selectedDate}/31.25m/{z}/{y}/{x}.png`}
                    maxZoom={12}
                    opacity={0.6}
                    eventHandlers={{
                        tileload: applyColorFilter,
                    }}
                />
            )}
            {eventPosition && <Marker position={eventPosition} />}
            <MapPanTo position={eventPosition} />
        </MapContainer>
    );
};

export default MapView;
