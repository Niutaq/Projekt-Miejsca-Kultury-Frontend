import React, { useState, useRef } from 'react';

function DragAndDrop({ onImageChange }) {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    function selectFile() {
        fileInputRef.current.click();
    }

    function onFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.split('/')[0] === 'image') {
            const newImage = {
                url: URL.createObjectURL(file),
                file: file
            };
            setImage(newImage);
            onImageChange(newImage);
        }
    }

    return (
        <div className="drag_and_drop_card">
            <div className="drag_and_drop_description">
                <p>Dodawanie zdjęcia</p>
            </div>
            <div className="drop_area" onClick={selectFile}>
                Wrzuć zdjęcie tutaj lub {"   "}
                <span className="select" role="button" onClick={selectFile}>
                    Szukaj zdjęcia
                </span>
                <input name="file" type="file" className="image_file" ref={fileInputRef} onChange={onFileSelect} />
            </div>
            <div className="container">
                {image && (
                    <div className="image">
                        <img src={image.url} alt={image.name} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DragAndDrop;