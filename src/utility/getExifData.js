import piexif from "piexifjs";

export const getExifData = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onloadend = (e) => {
			const exifObj = piexif.load(e.target.result);
			for (var ifd in exifObj) {
				if (ifd === "thumbnail") {
					continue;
				}
				console.log("-" + ifd);
				for (var tag in exifObj[ifd]) {
					console.log("  " + piexif.TAGS[ifd][tag]["name"] + ":" + exifObj[ifd][tag]);
				}
			}
			resolve(exifObj)
		};
		reader.onerror = (err) => {
			reject(err)
		}

		reader.readAsDataURL(file);
	})
};
