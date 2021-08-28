export const getBase64Image = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (err) => {
            alert(err.message)
        }
        
    })
};