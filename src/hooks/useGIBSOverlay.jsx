export function useGIBSOverlay({ enabled, date = '2023-07-30' }) {
    if (!enabled) return null;

    const layerId = 'OPERA_L3_Dynamic_Surface_Water_Extent-HLS';
    const tileMatrixSet = '31.25m';
    const format = 'png';

    const urlTemplate = `https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/${layerId}/default/${date}/${tileMatrixSet}/{z}/{y}/{x}.${format}`;

    return {
        url: urlTemplate,
        options: {
            attribution: 'NASA GIBS - OPERA Surface Water',
            opacity: 0.6,
            tileSize: 256,
            maxZoom: 12,
        },
    };
}
