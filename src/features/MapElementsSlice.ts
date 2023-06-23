import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";


const initialState: {
	selectChoice: any | null;
	jsonPlans: any | null;
	status: "idle" | "loaded" | "error";
	error: any;
	lat: any;
	lng: any;
} = {
	selectChoice: '0',
	jsonPlans: null,
	status: "idle",
	error: null,
	lat: null,
	lng: null,
};

export const MapElementsSlice = createSlice({
	name: "mapElements",
	initialState,
	reducers: {
		setJsonPlans: (state, action) => {
			state.jsonPlans = action.payload;
			state.status = "loaded";
		},
		setSelectChoice: (state, action) => {
			state.selectChoice = action.payload;
		},
		setErrorState: (state, action) => {
			state.error = action.payload;
			state.status = "error";
		},
		setCoords: (state, action) => {
			state.lat = action.payload.lat
			state.lng = action.payload.lng
		},
	},
});

export const getPlans = () => async (dispatch: any, getState: any) => {

	try {

		let lat = getState().mapElements.lat;
		let lon = getState().mapElements.lng;
		let rad = 500;
		let selectChoice = getState().mapElements.selectChoice;
		let URL_PERMIT, res, data;
		let Btoken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NzI4OTg0MSwianRpIjoiZjgyNjZhN2YtN2VhOC00YjBhLWE1ZmQtODE5ZTNlZmIwMjAzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NTksIm5iZiI6MTY4NzI4OTg0MSwiY3NyZiI6ImUyYThiMzQ1LTI4ZWMtNDU2MC1iYmVjLWQ3ZDJhZTcyZmI3OSIsImV4cCI6MTY4Nzg5NDY0MX0.9hHhT7Qwlg8qkjmuuw44Wpsfe-Qqi-2kYrgCcVJFQlQ";

		console.log(100, selectChoice, lat, lon, rad);

		// pozowlenie na budowe
		if (selectChoice === "0") {
			URL_PERMIT = `https://pointo.epp-services.pl:443/api/cs/urb/permit/index?lat=${lat}&lon=${lon}&rad=${rad}`;

			res = await fetch(URL_PERMIT, {
				headers: { Authorization: "Bearer " + Btoken},
			});

			if (res.status === 404) {

			}

			if (res.status === 400) {

			}

			if (res.status === 500) {

			}

			data = await res.json();

			if (res.status === 200) {
				dispatch(setJsonPlans(data));
			}
		}

	} catch (err: any) {
		throw new Error(err);
	}
};

export const { setJsonPlans, setSelectChoice, setErrorState, setCoords } = MapElementsSlice.actions;
export default MapElementsSlice.reducer;
