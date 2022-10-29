import {useEffect, useState} from "react";

export const useScrollDistance = (d: number) => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			setScrolled(window.scrollY > d);
		});

		return window.removeEventListener("scroll", () => setScrolled(false));
	}, [d, setScrolled]);

	return scrolled;
}