import piexif from "piexifjs";

const exifBytesToBase64Img = (exifbytes, imageFile) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
		reader.onload = (e) => {
			const inserted = piexif.insert(exifbytes, e.target.result);
            resolve(inserted)
		};
        reader.onerror = (err) => {
            reject(err)
        }
        reader.readAsDataURL(imageFile);
    })
};

export default exifBytesToBase64Img;