import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "./StageMap.css"
import { DrawCountryBoundryLine } from "./DrawCountryBoundryLine";
import { Nav } from "../nav/Nav"
import { DrawGeoJsonFromAPI } from "./DrawGeoJsonFromAPI";
import { useAppSelector, useAppDispatch } from "../hooks";
import * as MapElementsSlice from "../features/MapElementsSlice";


export const StageMap = ():JSX.Element => {
	return (
		<>
			<Nav />

			{/* https://github.com/najwer23/antoni-gaudi/blob/master/assets/js/leaflet.js */}
			{/* http://leaflet-extras.github.io/leaflet-providers/preview/ */}

			<MapContainer
				center={[52.0250921, 18.6386737]}
				zoom={7}
				maxZoom={18}
				scrollWheelZoom={true}
			>
				<DrawGeoJsonFromAPI />
				<DrawCountryBoundryLine />
				<TileLayer
					attribution=""
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapEvents />

			</MapContainer>
		</>
	)
}

const MapEvents = () => {
	const dispatch = useAppDispatch();

	useMapEvents({
		click(e) {
			dispatch(MapElementsSlice.setCoords(
				{
					lat: e.latlng.lat,
					lng: e.latlng.lng
				}
			));
			dispatch(MapElementsSlice.getPlans());
		},
	});
	return <></>;
}





