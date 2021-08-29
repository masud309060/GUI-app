import piexif from "piexifjs";

const showTheImageLocation = (exif) => {
	const latitude = exif["GPS"] && exif["GPS"][piexif.GPSIFD.GPSLatitude];
	const latitudeRef =
		exif["GPS"] && exif["GPS"][piexif.GPSIFD.GPSLatitudeRef];
	const longitude = exif["GPS"] && exif["GPS"][piexif.GPSIFD.GPSLongitude];
	const longitudeRef =
		exif["GPS"] && exif["GPS"][piexif.GPSIFD.GPSLongitudeRef];
		
	const url = drawMapForLocation(
		latitude,
		latitudeRef,
		longitude,
		longitudeRef
	);
	return url;
};

const drawMapForLocation = (latitude, latitudeRef, longitude, longitudeRef) => {
	if (latitude && latitudeRef && longitude && longitudeRef) {
		// Convert the latitude and longitude into the format that Google Maps expects
		// (decimal coordinates and +/- for north/south and east/west)
		const latitudeMultiplier = latitudeRef === "N" ? 1 : -1;
		const decimalLatitude =
			latitudeMultiplier * piexif.GPSHelper.dmsRationalToDeg(latitude);
		const longitudeMultiplier = longitudeRef === "E" ? 1 : -1;
		const decimalLongitude =
			longitudeMultiplier * piexif.GPSHelper.dmsRationalToDeg(longitude);

		const url = `https://www.google.com/maps?q=${decimalLatitude},${decimalLongitude}`;
		return url;
	} else {
		return "";
	}
};

export default showTheImageLocation;
