import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

export const DrawCountryBoundryLine = () => {
	const [data, setData] = useState();

	useEffect(() => {
		const getData = async () => {
			const response = await fetch("https://nominatim.openstreetmap.org/search?country=poland&polygon_geojson=1&format=json");
			const data = await response.json();
			setData(data[0].geojson);
		};
		getData();
	}, [])

	if (data) {

		let style = {
			fillColor: "transparent",
			weight: 2,
			opacity: 1,
			color: "red", //Outline color
			fillOpacity: 1
		};

		return <GeoJSON data={data} style={style} />;
	} else {
		return null;
	}
};