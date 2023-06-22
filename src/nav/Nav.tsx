import './Nav.css';
import { useEffect, useState } from "react";
import { Button } from '../buttons/Button';


export const Nav = () : JSX.Element => {
	return (
		<nav className='nav'>
			<div>
				<Menu />
			</div>
		</nav>
	)
}

const Menu = (): JSX.Element => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
							<li>halo</li>
						</ul>
					</div>
				</div>
			)}
		</>
	)
}



