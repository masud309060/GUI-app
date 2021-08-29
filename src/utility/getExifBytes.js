import piexif from "piexifjs";

const getExifBytes = (updatedData) => {
    const zeroth = {};
		const exif = {};
		const gps = {};
		if (updatedData.Make) {
			zeroth[piexif.ImageIFD.Make] = updatedData.Make;
		}
		if (updatedData.Model) {
			zeroth[piexif.ImageIFD.Model] = updatedData.Model;
		}
		if (updatedData.XResolution) {
			zeroth[piexif.ImageIFD.XResolution] = [updatedData.XResolution, 1];
		}
		if (updatedData.YResolution) {
			zeroth[piexif.ImageIFD.YResolution] = [updatedData.YResolution, 1];
		}
		if (updatedData.TileWidth) {
			zeroth[piexif.ImageIFD.TileWidth] = [updatedData.TileWidth, 1];
		}
		if (updatedData.TileLength) {
			zeroth[piexif.ImageIFD.TileLength] = [updatedData.TileLength, 1];
		}
		if (updatedData.Software) {
			zeroth[piexif.ImageIFD.Software] = updatedData.Software
				? updatedData.Software
				: "Piexif.js";
		}
		zeroth[piexif.ImageIFD.DateTime] = new Date().toLocaleString();

		if (updatedData.ShutterSpeedValue) {
			exif[piexif.ExifIFD.ShutterSpeedValue] =
				updatedData.ShutterSpeedValue;
		}
		if (updatedData.ApertureValue) {
			exif[piexif.ExifIFD.ApertureValue] = updatedData.ApertureValue;
		}
		if (updatedData.BrightnessValue) {
			exif[piexif.ExifIFD.BrightnessValue] = updatedData.BrightnessValue;
		}
		if (updatedData.Flash) {
			exif[piexif.ExifIFD.Flash] = Number(updatedData.Flash);
		}
		if (updatedData.FocalLength) {
			exif[piexif.ExifIFD.FocalLength] = updatedData.FocalLength;
		} 
		if (updatedData.LensModel) {
			exif[piexif.ExifIFD.LensModel] = updatedData.LensModel;
		}

		if(updatedData.GPSLatitude) {
			gps[piexif.GPSIFD.GPSLatitude] = updatedData.GPSLatitude;
			gps[piexif.GPSIFD.GPSLatitudeRef] = updatedData.GPSLatitudeRef;
		}
		
		if(updatedData.GPSLongitude) {
			gps[piexif.GPSIFD.GPSLongitude] = updatedData.GPSLongitude;
			gps[piexif.GPSIFD.GPSLongitudeRef] = updatedData.GPSLongitudeRef;
		}

		gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
		gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
        const exifObj = { "0th": zeroth, Exif: exif, GPS: gps };
		const exifbytes = piexif.dump(exifObj);
        return exifbytes;
}

export default getExifBytes;