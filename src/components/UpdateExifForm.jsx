import piexif from "piexifjs";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const UpdateExifForm = ({ updateExifData, handleClose, exif }) => {
    const [updatedExif, setUpdatedExif] = useState({
        Make: exif["0th"][piexif.ImageIFD.Make] ,
        Model: exif["0th"][piexif.ImageIFD.Model],
        TileWidth: exif["0th"][piexif.ImageIFD.TileWidth],
        TileLength: exif["0th"][piexif.ImageIFD.TileLength],
        XResolution: exif["0th"][piexif.ImageIFD.XResolution],
        YResolution: exif["0th"][piexif.ImageIFD.YResolution],
        ShutterSpeedValue: exif["Exif"][piexif.ExifIFD.ShutterSpeedValue],
        Flash: exif["Exif"][piexif.ExifIFD.Flash],
        FocalLength: exif["Exif"][piexif.ExifIFD.FocalLength],
    });
    const handleExifChange = (e) => {
        setUpdatedExif({...updatedExif, [e.target.name]: e.target.value})
    }

	return (
		<div className="p-3">
			<div onClick={handleClose} >
				<i className="far fa-times-circle close-btn"></i>
			</div>
			<Form onChange={handleExifChange}>
                
				<Form.Group className="mb-2">
					<Form.Label>Make</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.Make} name="Make"/>
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>Model</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.Model} name="Model"/>
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>XResolution</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.XResolution} name="XResolution"/>
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>YResolution</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.YResolution} name="YResolution"/>
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>TileWidth</Form.Label>
					<Form.Control size="sm" type="number" defaultValue={updatedExif.TileWidth} name="TileWidth" />
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>TileLength</Form.Label>
					<Form.Control size="sm" type="number" defaultValue={updatedExif.TileLength} name="TileLength" />
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>Software</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.Software} name="Software" />
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>ShutterSpeedValue</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.ShutterSpeedValue} name="ShutterSpeedValue" />
				</Form.Group>

				<Form.Group className="mb-2">
					<Form.Label>Flash</Form.Label>
					<Form.Control size="sm" type="text" defaultValue={updatedExif.Flash} name="Flash" />
				</Form.Group>
                
				<Form.Group className="mb-2">
					<Form.Label>FocalLength</Form.Label>
					<Form.Control size="sm" type="number" defaultValue={updatedExif.FocalLength} name="FocalLength" />
				</Form.Group>

				<div className="d-flex gap-3">
                    <Button onClick={(e) => updateExifData(e, updatedExif)} variant="success" type="submit">
                        Save Changes
                    </Button>
                    <Button onClick={handleClose} variant="danger" type="button">
                        Cencel
                    </Button>
                </div>
			</Form>
		</div>
	);
};

export default UpdateExifForm;
