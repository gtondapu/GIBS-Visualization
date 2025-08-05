/**
 * MapView.jsx
 * Main Leaflet map component for GIBS Visualization
 * Displays NASA's HLS_S30_Nadir_BRDF_Adjusted_Reflectance layer on basemap.
 * Shows a banner message when no overlay data is available for the selected date.
 */
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import FlyToBounds from "./FlyToBounds";
import { basemaps } from "./BaseMapSelector";
import "./../assets/styles/MapView.css";


const MapView = ({
                     showGIBS,
                     selectedDate,
                     colorStyle,
                     boundingBox,
                     geojson,
                     selectedBasemap,
    gibsLayer
                 }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const [noData, setNoData] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(false);

    const countersRef = useRef({
        total: 0,
        loaded: 0,
        empty: 0,
        started: false,
    });

    const basemap =
        basemaps.find((b) => b.id === selectedBasemap) || basemaps[0];

    // CSS filters for color styles
    const filterMap = {
        normal: "none",
        grayscale: "grayscale(100%)",
        inverted: "invert(100%)",
        falsecolor: "hue-rotate(200deg) saturate(2) brightness(1.1)",
        sepia: "sepia(60%) saturate(2)",
    };

    // Apply CSS filter on each tile image
    const applyColorFilter = (event) => {
        const tileImg = event.tile;
        if (tileImg && tileImg.style) {
            tileImg.style.filter = filterMap[colorStyle] || "none";
        }
    };

    // Check if tile image is empty (transparent)
    const isTileTransparent = (img) => {
        try {
            const w = img.naturalWidth || img.width;
            const h = img.naturalHeight || img.height;
            if (!w || !h) return false;
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);
            const pixels = ctx.getImageData(0, 0, w, h).data;
            const step = 10; // sample pixels
            for (let i = 3; i < pixels.length; i += 4 * step) {
                if (pixels[i] > 0) return false;
            }
            return true;
        } catch {
            return false; // if CORS or error, assume not empty to avoid false no-data
        }
    };

    // Reset counters on overlay toggle or date change
    useEffect(() => {
        countersRef.current = { total: 0, loaded: 0, empty: 0, started: false };
        setNoData(false);
        setBannerVisible(false);
    }, [selectedDate, showGIBS]);

    // Delay GeoJSON rendering for smoothness
    useEffect(() => {
        if (boundingBox && geojson) {
            setShowOverlay(false);
            const t = setTimeout(() => setShowOverlay(true), 800);
            return () => clearTimeout(t);
        }
    }, [boundingBox, geojson]);

    // Decide no data once all tiles loaded/errored
    const evaluateNoData = () => {
        const c = countersRef.current;
        if (!showGIBS || !c.started) return; // only if overlay active & tiles requested
        if (c.total > 0 && c.loaded === c.total && c.empty === c.total) {
            setNoData(true);
            setBannerVisible(true);
        } else {
            setNoData(false);
            setBannerVisible(false);
        }
    };

    // Map overlay URL
    const gibsUrl = gibsLayer.urlTemplate.replace("{date}", selectedDate);

    return (
        <div style={{ height: "100%", width: "100%", position: "relative" }}>
            <MapContainer
                center={[25, 0]}
                zoom={2.5}
                style={{ height: "100%", width: "100%" }}
            >
                {/* Basemap - no event handlers */}
                <TileLayer url={basemap.url} attribution={basemap.attribution} />

                {/* Overlay */}
                {showGIBS && (
                    <TileLayer
                        key={`${selectedDate}-${colorStyle}`}
                        url={gibsUrl}
                        maxZoom={12}
                        opacity={0.6}
                        eventHandlers={{
                            tileloadstart: () => {
                                countersRef.current.started = true;
                                countersRef.current.total += 1;
                            },
                            tileload: (e) => {
                                countersRef.current.loaded += 1;
                                if (isTileTransparent(e.tile)) countersRef.current.empty += 1;

                                // APPLY COLOR FILTER ON TILE LOAD
                                applyColorFilter(e);
                            },
                            tileerror: () => {
                                countersRef.current.loaded += 1;
                                countersRef.current.empty += 1;
                            },
                            load: evaluateNoData,
                        }}
                    />
                )}

                {boundingBox && <FlyToBounds bounds={boundingBox} />}
                {showOverlay && geojson && (
                    <GeoJSON
                        key={JSON.stringify(geojson)}
                        data={geojson}
                        style={{ color: "red", weight: 2, fillOpacity: 0.3 }}
                    />
                )}
            </MapContainer>

            {/* No data banner */}
            {showGIBS && noData && bannerVisible && (
                <div className="no-data-banner">
                    No data available for {selectedDate} &nbsp;&nbsp;&nbsp;
                    <button
                        onClick={() => setBannerVisible(false)}
                        aria-label="Close no data banner"
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapView;
