import { MapContainer, TileLayer,GeoJSON, useMap } from 'react-leaflet';
import { useGIBSOverlay } from '../hooks/useGIBSOverlay';
import { useEffect, useState } from 'react';
import FlyToBounds from './FlyToBounds';
import { basemaps } from './BaseMapSelector';

const MapView = ({ showGIBS, selectedDate, colorStyle, selectedEvent,boundingBox, geojson, selectedBasemap  }) => {
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
    const [showOverlay, setShowOverlay] = useState(false);
    const basemap = basemaps.find((b) => b.id === selectedBasemap) || basemaps[0];

    const applyColorFilter = (event) => {
        console.log('Applying filter', colorStyle);
        const tileImg = event.tile; // This is the <img> element of the tile
        if (tileImg && tileImg.style) {
            tileImg.style.filter = filterMap[colorStyle] || 'none';
        }
    };
    useEffect(() => {
        if (boundingBox && geojson) {
            // Delay showing the GeoJSON to allow base tiles to render
            setShowOverlay(false);
            const timer = setTimeout(() => {
                setShowOverlay(true);
            }, 800); // 800ms seems to work well

            return () => clearTimeout(timer);
        }
    }, [boundingBox, geojson]);

    return (
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer url={basemap.url} attribution={basemap.attribution} />

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
            {boundingBox && <FlyToBounds bounds={boundingBox} />}
            {showOverlay && geojson && <GeoJSON key={JSON.stringify(geojson)} data={geojson} style={{ color: 'red', weight: 2, fillOpacity: 0.3  }} />}

        </MapContainer>
    );
};

export default MapView;
