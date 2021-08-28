import piexif from "piexifjs";
import React from "react";

const ImageData = ({ imageFile, exif }) => {

	// const ifds = ["0th", "Exif", "GPS", "Interop", "1st"];
	return (
		<div className="imageData">
			{ imageFile.name && imageFile.size?
			<table>
				<tr>
					<th colSpan="2">Basic Image info:</th>
				</tr>
				<tr>
					<td>File Name</td>
					<td>{imageFile.name}</td>
				</tr>
				<tr>
					<td>File size</td>
					<td>{(Number(imageFile.size) / 1000000).toFixed(2)} MB</td>
				</tr>
				<tr>
					<td>File Type</td>
					<td>{imageFile.type}</td>
				</tr>
			</table> : ""}

			{exif["0th"] ? (
				<table>
					<tr>
						<th>Exif: </th>
					</tr>
					{exif["0th"]  && exif["0th"][piexif.ImageIFD.Make] && (
						<tr>
							<td>Make:</td>
							<td>{exif["0th"][piexif.ImageIFD.Make]}</td>
						</tr>
					)}
					{exif["0th"][piexif.ImageIFD.Model] && (
						<tr>
							<td>Model:</td>
							<td>{exif["0th"][piexif.ImageIFD.Model]}</td>
						</tr>
					)}

					{exif["0th"][piexif.ImageIFD.XResolution] && (
						<tr>
							<td>XResolution:</td>
							<td>{exif["0th"][piexif.ImageIFD.XResolution][0]} Pixels</td>
						</tr>
					)}
					{exif["0th"][piexif.ImageIFD.YResolution] && (
						<tr>
							<td>YResolution:</td>
							<td>{exif["0th"][piexif.ImageIFD.YResolution][0]} Pixels</td>
						</tr>
					)}
					{exif["0th"][piexif.ImageIFD.DateTime] && (
						<tr>
							<td>DateTime:</td>
							<td>{exif["0th"][piexif.ImageIFD.DateTime]}</td>
						</tr>
					)}
					{exif["0th"][piexif.ImageIFD.Software] && (
						<tr>
							<td>Software:</td>
							<td>{exif["0th"][piexif.ImageIFD.Software]}</td>
						</tr>
					)}
					{exif["0th"][piexif.ImageIFD.TileWidth] && (
						<tr>
							<td>TileWidth: </td>
							<td>{exif["0th"][piexif.ImageIFD.TileWidth]}</td>
						</tr>
					)}
					{exif["0th"][piexif.ImageIFD.TileLength] && (
						<tr>
							<td>TileLength: </td>
							<td>{exif["0th"][piexif.ImageIFD.TileLength]}</td>
						</tr>
					)}
				</table>
			) : (
				""
			)}

			{exif["Exif"] ? (
				<table>
					{exif["Exif"][piexif.ExifIFD.ShutterSpeedValue] && (
						<tr>
							<td>ShutterSpeedValue:</td>
							<td>{exif["Exif"][piexif.ExifIFD.ShutterSpeedValue]}</td>
						</tr>
					)}
					{exif["Exif"][piexif.ExifIFD.ApertureValue] && (
						<tr>
							<td>ApertureValue:</td>
							<td>{exif["Exif"][piexif.ExifIFD.ApertureValue]}</td>
						</tr>
					)}
					{exif["Exif"][piexif.ExifIFD.BrightnessValue] && (
						<tr>
							<td>BrightnessValue:</td>
							<td>{exif["Exif"][piexif.ExifIFD.BrightnessValue]}</td>
						</tr>
					)}
					{exif["Exif"][piexif.ExifIFD.Flash] && (
						<tr>
							<td>Flash:</td>
							<td>{exif["Exif"][piexif.ExifIFD.Flash]}</td>
						</tr>
					)}
					{exif["Exif"][piexif.ExifIFD.FocalLength] && (
						<tr>
							<td>FocalLength:</td>
							<td>{exif["Exif"][piexif.ExifIFD.FocalLength]}</td>
						</tr>
					)}
					{exif["Exif"][piexif.ExifIFD.LensModel] && (
						<tr>
							<td>LensModel:</td>
							<td>{exif["Exif"][piexif.ExifIFD.LensModel]}</td>
						</tr>
					)}
				</table>
			) : (
				""
			)}
		</div>
	);
};

export default ImageData;
