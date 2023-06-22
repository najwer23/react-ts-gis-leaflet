import { useRef } from "react";
import "./Stage.css";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import Figure from "./Figure"
import { useAppSelector, useAppDispatch } from "../hooks";
import * as StageSlice from "../features/stage/StageSlice";
import { Item } from "../types";

function Stage() {
	const projects = useAppSelector((state: any) => state.stage.projects);
	const status = useAppSelector((state: any) => state.stage.status);
	const error = useAppSelector((state: any) => state.stage.error);
	const projectId = useRef<HTMLInputElement>(null)

	const dispatch = useAppDispatch();

	let cssCanvas: {
		aspectRatio?: number
	} = {};

	let viewBox: string = "";

	if (status === "project") {
		cssCanvas = {
			aspectRatio: (projects.project.width) / (projects.project.height),
		}

		viewBox = `0 0 ${projects.project.width} ${projects.project.height}`
	}

	function validProjectId() {
		// todo validate input
		// console.log(projectId.current!.value)
	}

	function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
		e.preventDefault()
		dispatch(StageSlice.getProject(projectId.current!.value));
	}

  return (
	<>
		<div className='container'>

			<form onSubmit={handleSubmit} className="container-stage-form">
				<Input
					innerRef={projectId}
					id={"projectId"}
					label={"Project ID"}
					type="text"
					onBlur={validProjectId}
				/>

				<Button text={"Fetch"} />
			</form>

			<hr />

			{
				status === "error" &&
				(
					<div className='container-stage'>
						<>error!</> <br />
						<>{error.error}</> <br />
						<>{error.message}</> <br />
					</div>
				)

			}

			{
				status === "project" &&
				(
					<>
						<div className='container-stage'>
							Name: {projects.project.name} <br />
							ID: {projects.project.id}
						</div>

						<div className="container-stage-canvas" style={cssCanvas}>

							<svg
								width="100%"
								height="100%"
								preserveAspectRatio="xMidYMid meet"
							>

								<svg
									width="100%"
									height="100%"
									viewBox={viewBox}
								>
									{
										projects.project.items.map((item: Item, index: number) => {
											return (
												<Figure key={index} dimensions={item} />
											)
										})
									}
								</svg>
							</svg>
						</div>
					</>
				)
			}



		</div>
	</>
  )
}

export default Stage;