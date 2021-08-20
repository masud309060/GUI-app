import React, { useState } from "react";

const ExampleUpload = () => {
    const [images, setImages] = useState([]);

	const handleChange = (e) => {
		for (let i = 0; i < e.target.files.length; i++) {
			let file = e.target.files[i];
		}
	};

    const handleImageSubmit = () => {
        console.log('hello')
    }

	return (
		<div className="upload-image">
			<input type="file" id="file" multiple onChange={handleChange} />
                <div className="label-holder">
                    <label htmlFor="file" className="label take-btn">
                        <span>Take </span>
                        <i className="fas fa-camera"></i>
                    </label>
                    
                    <label onClick={handleImageSubmit} className="label upload-btn">
                        <span>Upload</span>
                        <i className="fas fa-cloud-upload-alt"></i>
                    </label>
                </div>
                {
                    images.length ? 
                    <div className="show-img-name">
                        { images.map( (image) => <small key={image.id}>{image.name}</small> ) }
                    </div> : ""
                }
                
            {/* <div className="result">
               { urls.length ? urls.map(url => (
                   <div className="uploaded-image" key={url}>
                       <img onClick={() => handleImageClick(url)} src={url} alt={url} />
                   </div>
               )) : "" }
            </div> */}
		</div>
	);
};

export default ExampleUpload;
