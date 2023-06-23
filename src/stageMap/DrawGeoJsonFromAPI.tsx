import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useAppSelector, useAppDispatch } from "../hooks";
import { RootState } from "../store";


export const DrawGeoJsonFromAPI = () => {
	const jsonPlans = useAppSelector((state: RootState) => state.mapElements.jsonPlans);

	console.log(42, jsonPlans)

	let style = {
		fillColor: "transparent",
		weight: 2,
		opacity: 1,
		color: "purple", //Outline color
		fillOpacity: 1
	};

	return <GeoJSON key={JSON.stringify(jsonPlans)} data={jsonPlans} style={style} />;
};