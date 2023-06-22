import './Nav.css';
import { useEffect, useState } from "react";
import { Button } from '../buttons/Button';
import { useWindowSize } from "../utils/Utils";
import Select from 'react-select';

export const Nav = () : JSX.Element => {
	return (
		<nav className='nav'>
			<div>
				<Menu />
			</div>
		</nav>
	)
}






const OptionListForSelect = [
	{ value: "1", label: "Pozwolenia na budowę" },
	{ value: "2", label: "Plany zagospodarowania terenu" },
];









const Menu = (): JSX.Element => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [width,] = useWindowSize();

	useEffect(() => {
		let body = document.querySelector("body")
		if (isMenuOpen) {
			body!.classList.add("menu-open");
		} else {
			body!.classList.remove("menu-open");
		}
	}, [isMenuOpen]);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}




	const OptionListForSelectCSS = {
		control: (base: any) => ({
			...base,
			border: 0,
			boxShadow: 'none'
		}),
		option: (base: any, state: any) => ({
			...base,
			width: "200px",
			minWidth: "100%",
			backgroundColor: state.isSelected ? "#c4c4c4" : "",
			'&:hover': {
				backgroundColor: state.isSelected ? '#c4c4c4' : 'whitesmoke',
				cursor: "pointer"
			},
			color: state.isSelected ? "black" : "",
		}),
		input: (base: any, state: any) => ({
			...base,
			width: "max-content",
			minWidth: "100%",
		}),
		menu: (base: any) => ({
			...base,
			width: "max-content",
			minWidth: "100%",
		}),
	}

	return (
		<>
			<Button
				type={"button"}
				onClick={toggleMenu}
				className={'noselect btn-classic'}
				title={"Menu Open"}
				ariaLabel={"Menu Open"}
				text={"Options"}
			/>

			{ isMenuOpen && (
				<div className="popup-menu">
					<div className="popup-menu-button-close-wrapper">
						<Button
							type={"button"}
							onClick={toggleMenu}
							className={'noselect btn-classic'}
							title={"Menu Close"}
							ariaLabel={"Menu Close"}
							text={"CLOSE"}
						/>
					</div>

					<div className='layout1'>
						<ul className='popup-menu-list'>
							<li>
								<h2 className='fluid-h2'>Options</h2>

								<div style={{
									width: width <= 575.98 ? "100%" : "400px",
									marginBottom: "30px"
								}}>
									<Select
										styles={OptionListForSelectCSS}
										defaultValue={OptionListForSelect[0]}
										// onChange={setCoords}
										options={OptionListForSelect}
										isSearchable={false}
									/>
								</div>


							</li>
						</ul>
					</div>
				</div>
			)}
		</>
	)
}



