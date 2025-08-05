import { useMap } from 'react-leaflet';
import { useEffect } from 'react';

const FlyToBounds = ({ bounds }) => {
    const map = useMap();

    useEffect(() => {
        if (bounds) {
            const sw = [bounds[1], bounds[0]]; // [lat, lng]
            const ne = [bounds[3], bounds[2]];
            map.flyToBounds([sw, ne], {
                padding: [40, 40],
                duration: 1.5,
            });
        }
    }, [bounds, map]);

    return null;
};

export default FlyToBounds;
