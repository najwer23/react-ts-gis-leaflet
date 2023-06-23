import { GeoJSON } from "react-leaflet";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";


export const DrawGeoJsonFromAPI = () => {
	const jsonPlans = useAppSelector((state: RootState) => state.mapElements.jsonPlans);
	const selectChoice = useAppSelector((state: RootState) => state.mapElements.selectChoice);

	let colors: any = {
		0: "orangered",
		1: "purple"
	}

	let style = {
		fillColor: "transparent",
		weight: 2,
		opacity: 1,
		color: colors[Number(selectChoice)],
		fillOpacity: 1
	};

	return <GeoJSON key={JSON.stringify(jsonPlans)} data={jsonPlans} style={style} />;
};