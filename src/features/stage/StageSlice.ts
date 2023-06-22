import { createSlice } from "@reduxjs/toolkit";
import { InitData, Projects, ErrorMsg, Project, Item, ItemType } from "../../types";

const initialState: {
	initData: InitData | null;
	projects: Projects | null;
	status: "init" | "idle" | "project" | "error";
	error: ErrorMsg | null;
} = {
	initData: null,
	projects: null,
	status: "idle",
	error: null
};

export const StageSlice = createSlice({
	name: "stage",
	initialState,
	reducers: {
		setInitState: (state, action) => {
			state.initData = action.payload
			state.status = "init"
		},
		setProjectState: (state, action) => {
			state.projects = action.payload
			state.status = "project"
		},
		setErrorState: (state, action) => {
			state.error = action.payload
			state.status = "error"
		},
	}
});

export const getProject = (projectId?: string) => async (dispatch: any) => {
	try {

		let URL, res, data;

		if (projectId === "") {
			URL = "https://recruitment01.vercel.app/api/init";
			res = await fetch(URL)
			data = await res.json();
			dispatch(setInitState(data))
			projectId = data.id;
		}

		URL = "https://recruitment01.vercel.app/api/project/" + projectId;
		res = await fetch(URL)
		data = await res.json();

		if (data.error) {
			dispatch(setErrorState(data))
		} else {
			if (!isDataProjectValid(data.project)) {
				let errorMsg: ErrorMsg = {
					error: 42,
					message: "Błędny format danych z API"
				}
				dispatch(setErrorState(errorMsg))
			} else {
				dispatch(setProjectState(data))
			}
		}

	} catch (err: any) {
		throw new Error(err);
	}
};





function isDataProjectValid(data: Project): boolean {

	let validatorChecker: Array<boolean> = [];
	let validator:Array<boolean> = [
		isPositiveNumber(data.height),
		isPositiveNumber(data.width),
		isArrOfFiguresValid(data.items)
	]

	validatorChecker = validator.filter((v) => !v);

	return validatorChecker.length === 0;
}

const isArrOfFiguresValid = (arr: Item[]) : boolean => {

	let validator: Array<boolean> = [];
	let validatorChecker: Array<boolean> = [];
	let validatorFlag:boolean = false;

	for (let i=0; i<arr.length; i++) {
		validator = [
			isPositiveNumber(arr[i].height),
			isPositiveNumber(arr[i].width),
			isValidAngle(arr[i].rotation),
			isValidColorFormat(arr[i].color),
			isValidTypeFigure(arr[i].type)
		]

		validatorChecker = validator.filter((v) => !v);

		if (validatorChecker.length !== 0) {
			validatorFlag = true;
			console.log(arr[i], validator)
			break;
		}
	}

	return !validatorFlag;
}

const isValidTypeFigure = (type: ItemType): type is ItemType => {
	return ['rectangle', 'ellipse'].some(x => x === type);
}
const isValidColorFormat = (str: string): boolean => {
	return (/^#[0-9a-f]{3,6}$/i).test(str);
}
const isValidAngle = (angle: number): boolean => {
	return angle >= 0 && angle <=360
}
const isPositiveNumber = (number: number): boolean => {
	return Math.sign(number) > 0;
}





export const { setInitState, setProjectState, setErrorState } = StageSlice.actions;
export default StageSlice.reducer;