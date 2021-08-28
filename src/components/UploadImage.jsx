import React, { useState } from "react";
import ImageData from "./ImageData";
import { Button, Modal } from "react-bootstrap";
import UpdateExifForm from "./UpdateExifForm";
import { getBase64Image } from "../utility/getBase64Image";
import { getExifData } from "../utility/getExifData";
import piexif from "piexifjs";

const UploadImage = () => {
    const [base64Img, setBase64Img] = useState("");
    const [imageFile, setImageFile] = useState({});
    const [exif, setExif] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

	const handleChange = async (evt) => {
        let file = await evt.target.files[0];
        setImageFile(file);
        try {
            const Base64Image = await getBase64Image(file);
            setBase64Img(Base64Image);
            const exifData = await getExifData(file);
            setExif(exifData);
        } catch(err) {
            alert(err.message);
        }
	};

    const updateExifData = (e, updatedData) => {
        e.preventDefault();
        handleClose();

        console.log('update ongoing')
        const zeroth = {};
        const exif = {};
        const gps = {};
        if(updatedData.Make) {
            zeroth[piexif.ImageIFD.Make] = updatedData.Make;
        }
        if(updatedData.Model) {
            zeroth[piexif.ImageIFD.Model] = updatedData.Model;
        }
        if(updatedData.XResolution) {
            zeroth[piexif.ImageIFD.XResolution] = [updatedData.XResolution, 1];
        }
        if(updatedData.YResolution) {
            zeroth[piexif.ImageIFD.YResolution] = [updatedData.YResolution , 1];
        }
        if(updatedData.TileWidth) {
            zeroth[piexif.ImageIFD.TileWidth] = [updatedData.TileWidth, 1];
        }
        if(updatedData.TileLength) {
            zeroth[piexif.ImageIFD.TileLength] = [updatedData.TileLength, 1];
        }
        if(updatedData.Software) {
            zeroth[piexif.ImageIFD.Software] = updatedData.Software ? updatedData.Software : "Piexif.js";
        }
        zeroth[piexif.ImageIFD.DateTime] = new Date().toLocaleString();

        if(updatedData.ShutterSpeedValue) {
            exif[piexif.ExifIFD.ShutterSpeedValue] = updatedData.ShutterSpeedValue;
        }
        if(updatedData.Flash) {
            console.log(updatedData.Flash)
            exif[piexif.ExifIFD.Flash] = Number(updatedData.Flash);
        }
        if(updatedData.FocalLength) {
            exif[piexif.ExifIFD.FocalLength] = updatedData.FocalLength;
        }        

        gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
        gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
        const exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};
        const exifbytes = piexif.dump(exifObj);

        var reader = new FileReader();
        reader.onload = function(e) {
            const inserted = piexif.insert(exifbytes, e.target.result);
            setBase64Img(inserted);
        };
        reader.readAsDataURL(imageFile);
    };

	return (
		<div className="upload-image">
			<input type="file" id="file" multiple onChange={handleChange} />
                <div className="label-holder">
                    <label htmlFor="file" className="label take-btn">
                        <span>Upload </span>
                        <i className="fas fa-camera"></i>
                    </label>
                </div>
                <div style={{textAlign: "center", marginTop: "1rem"}}>
                    <img src={base64Img} height="400" alt="" />
                </div>
                { base64Img &&
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <Button variant="danger" onClick={handleShow}>Update MetaData</Button>
                    <Button variant="success">
                        <a href={base64Img} download={"download" + Math.round(Math.random() * 10000)} >DownLoad Image</a>
                    </Button>
                </div>}
                <Modal show={show}>
                    <UpdateExifForm handleClose={handleClose} updateExifData={updateExifData} exif={exif} />
                </Modal>
                <ul>
                    <ImageData imageFile={imageFile} exif={exif} /> 
                </ul>
		</div>
	);
};

export default UploadImage;

