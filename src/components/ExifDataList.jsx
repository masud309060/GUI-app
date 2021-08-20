import React from "react";
import { getExifData } from "../utility/getExifData";

const ExifDataList = ({ image }) => {
	const {
		DeviceName,
		Model,
		XResolution,
		YResolution,
		Software,
		DateTime,
		ShutterSpeed,
		BrightNess,
		Flash,
		FocalLength,
		GPSLatitude,
		GPSLongitude,
		GPSAltitude,
		GPSSpeedRef,
		GPSImgDirection,
	} = getExifData(image.exifdata);

	console.log(getExifData(image.exifdata));
	return (
		<div>
			<ul className="image-exifdata">
				<li>
					{"DeviceName"}: {DeviceName}
				</li>
				<li>
					{"Model"}: {Model}
				</li>
				<li>
					{"XResulation"}: {XResolution}
				</li>
				<li>
					{"YResulation"}: {YResolution}
				</li>
				<li>
					{"Software"}: {Software}
				</li>
				<li>
					{"Model"}: {Model}
				</li>
				<li>
					{"DateTime"}: {DateTime}
				</li>
				<li>
					{"ShutterSpeed"}: {ShutterSpeed}
				</li>
				<li>
					{"BrightNess"}: {BrightNess}
				</li>
				<li>
					{"Flash"}: {Flash}
				</li>
				<li>
					{"FocalLength"}: {FocalLength}
				</li>
				<li>
					{"GPSLatitude"}: {GPSLatitude}
				</li>
				<li>
					{"GPSLongitude"}: {GPSLongitude}
				</li>
				<li>
					{"GPSAltitude"}: {GPSAltitude}
				</li>
				<li>
					{"GPSSpeedRef"}: {GPSSpeedRef}
				</li>
				<li>
					{"GPSImgDirection"}: {GPSImgDirection}
				</li>
			</ul>
		</div>
	);
};

export default ExifDataList;
