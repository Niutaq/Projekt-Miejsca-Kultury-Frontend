import React, { useState, useRef } from 'react';

// Card - image template area
function DragAndDrop() {
    const [images, setImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [comments, setComments] = useState({});

    // Function for image selecting
    function selectFiles() {
        fileInputRef.current.click();
    }

    // Function for finding images
    function onFileSelect(event) {
        const files = event.target.files;
        if (files.length === 0) return;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                const newImage = {
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                };
                setImages((prevImages) => [...prevImages, newImage]);
                setComments((prevComments) => ({ ...prevComments, [newImage.name]: "" }));
            }
        }
    }

    // Function for image deleting
    function deleteImages(index) {
        const imageName = images[index].name;
        setImages((prevImages) =>
            prevImages.filter((_, i) => i !== index)
        );
        setComments((prevComments) => {
            const newComments = { ...prevComments };
            delete newComments[imageName];
            return newComments;
        }); // Delete comment for removed image
        console.log("File deleted!");
        console.log("Image: ", images);
    }

    // Drag over function
    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    // Drag leave function
    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    // Drop image function
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.split('/')[0] !== 'image') continue;
            if (!images.some((e) => e.name === files[i].name)) {
                const newImage = {
                    name: files[i].name,
                    url: URL.createObjectURL(files[i]),
                };
                setImages((prevImages) => [...prevImages, newImage]);
                setComments((prevComments) => ({ ...prevComments, [newImage.name]: "" }));
            }
        }
    }

    // Function for file uploading
    function uploadFile() {
        console.log("File uploaded!");
        console.log("Image: ", images);
        console.log("Comments: ", comments);
    }
    
    return (
        <div className="drag_and_drop_card">
            <div className="drag_and_drop_description">
                <p>Dodawanie zdjęć</p>
            </div>
            <div className="drop_area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="select">
                        Wrzuć zdjęcia tutaj
                    </span>
                ) : (
                    <>
                        Wrzuć zdjęcia tutaj lub {"   "}
                        <span className="select" role="button" onClick={selectFiles}>
                            Szukaj zdjęć
                        </span>
                    </>
                )}

                <input name="file" type="file" className="image_file" multiple ref={fileInputRef} onChange={onFileSelect} />
            </div>

            <div className="container">
                {images.map((image, index) => (
                    <div className="image" key={index}>
                        <span className="delete" onClick={() => deleteImages(index)}>&times;</span>
                        <img src={image.url} alt={image.name} />
                    </div>
                ))}
            </div>
            <button type="button" onClick={uploadFile}> Wyślij </button>
        </div>
    );
}

export { DragAndDrop as default };

