import React, { useState } from "react";
import storage from "../firebase";
import EXIF from "exif-js";
import UploadResult from "./UploadResult";

const UploadImage = () => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

	const handleChange = (e) => {
        setImages(prevState => []);
        setUrls(prevState => []);
        let files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            let newImage = files[i];
            EXIF.getData(newImage, function() {
                EXIF.getAllTags(this);
                newImage.id = Math.round(Math.random()  * 10000);
                setImages(prevState => [...prevState, newImage]);
            })
            console.log(newImage)
        }
	};

    const handleImageSubmit = () => {
        const promises = [];
        images.map(image => {
            const uploadTask = storage.ref().child(`images/${image.name}`).put(image);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                      );
                      setProgress(progress);
                },
                errer => {
                    console.log(errer)
                },
                async () => {
                    await storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrls(prevState => [...prevState, url])
                    })
                }
            )
        })
        
        Promise.all(promises)
        .then(() => console.log(urls))
        .catch(() => alert('something went wrong!')) 
    }

	return (
		<div className="upload-image">
            <progress value={progress} />
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
                    images.length > 0 && urls.length === 0 ? 
                    <div className="show-img-name">
                        { images.map( (image, i) => <small key={i}>{image.name}</small> ) }
                    </div> : ""
                }
                
                <UploadResult images={images} urls={urls} /> 
		</div>
	);
};

export default UploadImage;
