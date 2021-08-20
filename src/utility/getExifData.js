export const getExifData = (exifData) => {
	if (exifData) {
		const object = {};
		object.DeviceName = exifData.Make;
		object.Model = exifData.Model;
		object.XResolution = exifData.XResolution ? exifData.XResolution.denominator : "";
		object.YResolution = exifData.YResolution ? exifData.YResolution.denominator : "";
		object.Software = exifData.Software;
		object.DateTime = exifData.DateTime;
		object.ShutterSpeed = Math.round(exifData.ShutterSpeedValue).toFixed(2);
		object.BrightNess = exifData.BrightnessValue;
		object.Flash = exifData.Flash;
		object.FocalLength = exifData.FocalLength ? `${exifData.FocalLength.denominator / exifData.FocalLength.numerator}` : "";
		object.GPSLatitude = exifData.GPSLatitude ? `${exifData.GPSLatitude[0].numerator}, ${exifData.GPSLatitude[1].numerator}, ${exifData.GPSLatitude[2].numerator}` : "";
		object.GPSLongitude = exifData.GPSLongitude ? `${exifData.GPSLongitude[0].numerator}, ${exifData.GPSLongitude[1].numerator}, ${exifData.GPSLongitude[2].numerator}` : "";
		object.GPSAltitude = exifData.GPSAltitude ? `${exifData.GPSAltitude.denominator} / ${exifData.GPSAltitude.numerator}` : "";
		object.GPSSpeedRef = exifData.GPSSpeedRef;
		object.GPSImgDirection = exifData.GPSAltitude ? `${exifData.GPSImgDirection.numerator}/${exifData.GPSImgDirection.denominator}` : "";
		return object;
	} else {
		return {};
	}
};
