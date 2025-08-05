import React from "react";
import Select, { components } from "react-select";

/**
 * Basemap list: add `thumb` for each basemap (small image/icon URL)
 * Replace the thumb URLs with your preferred images or hosted icons.
 */export const basemaps = [
    {
        id: "osm",
        label: "OpenStreetMap",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "© OpenStreetMap contributors",
        thumb: "https://a.tile.openstreetmap.org/6/10/24.png",
    },
    {
        id: "esri",
        label: "Esri Satellite",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "Tiles © Esri",
        thumb: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/6/24/10",
    },
    {
        id: "carto-light",
        label: "CartoDB Positron",
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        attribution: "© CartoDB",
        thumb: "https://a.basemaps.cartocdn.com/light_all/6/10/24.png",
    },
    {
        id: "carto-dark",
        label: "CartoDB Dark",
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution: "© CartoDB",
        thumb: "https://a.basemaps.cartocdn.com/dark_all/6/10/24.png",
    },
];


/* -----------------------
   react-select renderers
   ----------------------- */

const Option = (props) => {
    const { data } = props;
    return (
        <components.Option {...props}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                    src={data.thumb}
                    alt={data.label}
                    style={{ width: 48, height: 32, objectFit: "cover", borderRadius: 4 }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div>
                    <div style={{ fontWeight: 600 }}>{data.label}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{data.id}</div>
                </div>
            </div>
        </components.Option>
    );
};

const SingleValue = (props) => {
    const { data } = props;
    return (
        <components.SingleValue {...props}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                    src={data.thumb}
                    alt={data.label}
                    style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 4 }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div style={{ fontWeight: 600 }}>{data.label}</div>
            </div>
        </components.SingleValue>
    );
};

/* -----------------------
   BasemapSelector component
   ----------------------- */

const BaseMapSelector = ({ current, onChange, className }) => {
    const options = basemaps.map((b) => ({ value: b.id, label: b.label, thumb: b.thumb, raw: b }));

    const selectedOption = options.find((o) => o.value === current) || options[0];

    return (
        <div style={{ minWidth: 260, ...(className ? {} : {}) }}>
            <label style={{ fontWeight: "bold", marginBottom: 6, display: "block" }}>
                Select Basemap
            </label>
            <Select
                value={selectedOption}
                options={options}
                onChange={(opt) => onChange(opt?.value)}
                components={{ Option, SingleValue }}
                isSearchable={true}
                isClearable={false}
                placeholder="Choose basemap..."
                styles={{
                    control: (provided) => ({ ...provided, minHeight: 44 }),
                    option: (provided) => ({ ...provided, padding: 10 }),
                }}
            />
        </div>
    );
};

export default BaseMapSelector;
