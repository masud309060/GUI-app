import React from "react";
import ExifDataList from "./ExifDataList";

const UploadResult = ({ images, urls }) => {
	if (images.length > 0 && urls.length > 0) {
        return (
            <div className="upload-result-container">
                { images.map((image, i) => (
                    <div className="upload-result" key={image.id}>
                        <div className="uploaded-image">
                            <img src={urls[i]} alt={images.name} />
                        </div>
                        <ExifDataList image={image} />
                    </div>
                )) }
            </div>
        );
    } else {
        return false;
    }
	
};

export default UploadResult;
