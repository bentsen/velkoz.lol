interface Identifier {
	unit: {[key: string]: IUnit}
}

interface IUnit {
	year: number
	month: number
	day: number
	hour: number
	minute: number
	second: number
}

let units: IUnit = {
	year  : 24 * 60 * 60 * 1000 * 365,
	month : 24 * 60 * 60 * 1000 * 365/12,
	day   : 24 * 60 * 60 * 1000,
	hour  : 60 * 60 * 1000,
	minute: 60 * 1000,
	second: 1000
}

let rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});

export function formatTime(unixTime: number | string) {
	if (typeof unixTime == "string") {
		unixTime = parseInt(unixTime);
	}

	const elapsed = unixTime - Date.now();
	if (Math.abs(elapsed) > units.year) {
		return rtf.format(Math.round(elapsed/units.year), "years");
	}
	if (Math.abs(elapsed) > units.month) {
		return rtf.format(Math.round(elapsed/units.month), "months");
	}
	if (Math.abs(elapsed) > units.day) {
		return rtf.format(Math.round(elapsed/units.day), "days");
	}
	if (Math.abs(elapsed) > units.hour) {
		return rtf.format(Math.round(elapsed/units.hour), "hours");
	}
	if (Math.abs(elapsed) > units.minute) {
		return rtf.format(Math.round(elapsed/units.minute), "minutes");
	}
	if (Math.abs(elapsed) > units.second) {
		return rtf.format(Math.round(elapsed/units.second), "seconds");
	}


}