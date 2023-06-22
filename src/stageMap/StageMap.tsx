import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import "./StageMap.css"
import { DrawCountryBoundryLine } from "./DrawCountryBoundryLine";

function StageMap() {

	return (
		<>
			{/* https://github.com/najwer23/antoni-gaudi/blob/master/assets/js/leaflet.js */}
			{/* http://leaflet-extras.github.io/leaflet-providers/preview/ */}

			<MapContainer
				center={[52.0250921, 18.6386737]}
				zoom={7}
				maxZoom={18}
				scrollWheelZoom={false}
			>
				<DrawCountryBoundryLine />
				<TileLayer
					attribution=""
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

			</MapContainer>
		</>
	)
}

export default StageMap;




