import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ImageData from "./ImageData";
import UpdateExifForm from "./UpdateExifForm";
import showTheImageLocation from "../utility/showTheImageLocation";
import getBase64Image from "../utility/getBase64Image";
import getExifData from "../utility/getExifData";
import getExifBytes from "../utility/getExifBytes";
import exifBytesToBase64Img from "../utility/exifBytesToBase64Img";

const UploadImage = () => {
	const [base64Img, setBase64Img] = useState("");
	const [imageFile, setImageFile] = useState({});
	const [exif, setExif] = useState({});
	const [show, setShow] = useState(false);
	const [location, setLocation] = useState("");

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
		} catch (err) {
			alert(err.message);
		}
	};

	useEffect(() => {
		if (exif !== {}) {
			const locationUrl = showTheImageLocation(exif);
			setLocation(locationUrl);
		}
	}, [exif]);

	const updateExifData = async (e, updatedData) => {
		e.preventDefault();
		handleClose();

		try {
			const exifbytes = await getExifBytes(updatedData);
			const insertedBase64Img = await exifBytesToBase64Img(
				exifbytes,
				imageFile
			);
			setBase64Img(insertedBase64Img);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<div className="upload-image-container">
			<input type="file" id="file" onChange={handleChange} />
			<div className="label-holder">
				<label htmlFor="file" className="label upload-btn">
					<span>Upload </span>
					<i className="fas fa-camera"></i>
				</label>
			</div>
			{base64Img && (
				<>
					<div style={{ textAlign: "center", marginTop: "1rem" }}>
						<img
							className="uploaded-image"
							src={base64Img}
							alt=""
						/>
						{location && (
							<a href={location} target="_blank" rel="noreferrer">
								show the image location
							</a>
						)}
					</div>
					<div className="d-flex justify-content-center gap-3 mt-3">
						<Button variant="danger" onClick={handleShow}>
							Update MetaData
						</Button>
						<Button variant="success">
							<a
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
								href={base64Img}
								download={
									"photo" + Math.round(Math.random() * 10000)
								}
							>
								DownLoad Image
							</a>
						</Button>
					</div>
				</>
			)}
			<Modal show={show}>
				<UpdateExifForm
					handleClose={handleClose}
					updateExifData={updateExifData}
					exif={exif}
				/>
			</Modal>
			<ImageData imageFile={imageFile} exif={exif} />
		</div>
	);
};

export default UploadImage;
