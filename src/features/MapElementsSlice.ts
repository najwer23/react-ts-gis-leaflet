import { createSlice } from "@reduxjs/toolkit";

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
			state.error = "";
		},
		setSelectChoice: (state, action) => {
			state.selectChoice = action.payload;
			state.error = "";
			state.status = "idle";
		},
		setErrorState: (state, action) => {
			state.error = action.payload;
			state.status = "error";
			state.jsonPlans = null
		},
		setCoords: (state, action) => {
			state.lat = action.payload.lat;
			state.lng = action.payload.lng;
		},
	},
});

export const getPlans = () => async (dispatch: any, getState: any) => {

	try {

		let lat = getState().mapElements.lat;
		let lon = getState().mapElements.lng;
		let rad = 100;
		let selectChoice = getState().mapElements.selectChoice;
		let URL = "", res, data;
		let Btoken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4NzI4OTg0MSwianRpIjoiZjgyNjZhN2YtN2VhOC00YjBhLWE1ZmQtODE5ZTNlZmIwMjAzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6NTksIm5iZiI6MTY4NzI4OTg0MSwiY3NyZiI6ImUyYThiMzQ1LTI4ZWMtNDU2MC1iYmVjLWQ3ZDJhZTcyZmI3OSIsImV4cCI6MTY4Nzg5NDY0MX0.9hHhT7Qwlg8qkjmuuw44Wpsfe-Qqi-2kYrgCcVJFQlQ";

		// GET Permit Index
		if (selectChoice === "0") {
			URL = `https://pointo.epp-services.pl:443/api/cs/urb/permit/index?lat=${lat}&lon=${lon}&rad=${rad}`;
		}
		// GET Zone Plan Index
		else if (selectChoice === "1") {
			URL = `https://pointo.epp-services.pl:443/api/cs/urb/zplan/index?lat=${lat}&lon=${lon}&rad=${rad}`;
		}

		res = await fetch(URL, {
			headers: { Authorization: "Bearer " + Btoken },
		});

		if (res.status === 404) {
			dispatch(setErrorState("Resource Not Found"))
		}

		if (res.status === 400) {
			dispatch(setErrorState("Bad Request"));
		}

		if (res.status === 500) {
			dispatch(setErrorState("Uknown Error"));
		}

		data = await res.json();

		if (res.status === 200) {
			dispatch(setJsonPlans(data));
		}

	} catch (err: any) {
		throw new Error(err);
	}
};

export const { setJsonPlans, setSelectChoice, setErrorState, setCoords } = MapElementsSlice.actions;
export default MapElementsSlice.reducer;
