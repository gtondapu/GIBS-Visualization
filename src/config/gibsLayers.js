/*
 * gibsLayers.js
 * Configuration for NASA GIBS WMTS layers.
 * This file has GIBS layer metadata so that
 * MapView and other components can dynamically load
 * different datasets without hardcoding URLs.
 */
export const gibsLayers = [
    {
        id: "HLS_S30",
        name: "HLS_S30_Nadir_BRDF_Adjusted_Reflectance",
        urlTemplate:
            "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/HLS_S30_Nadir_BRDF_Adjusted_Reflectance/default/{date}/31.25m/{z}/{y}/{x}.png",
        maxZoom: 12
    },
    {
        id: "OPERA_WATER",
        name: "OPERA_L3_Dynamic_Surface_Water_Extent-HLS",
        urlTemplate:
            "https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/OPERA_L3_Dynamic_Surface_Water_Extent-HLS/default/{date}/31.25m/{z}/{y}/{x}.png",
        maxZoom: 12
    }
];
