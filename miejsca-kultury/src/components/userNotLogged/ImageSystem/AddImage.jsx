import React, { useState, useRef } from 'react';

function DragAndDrop({ onImageChange }) {
    const [image, setImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
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

    function deleteImage() {
        setImage(null);
        console.log("Plik został usunięty.");
    }

    function onDragOver(event) {
        event.preventDefault();
        setIsDragging(true);
        event.dataTransfer.dropEffect = "copy";
    }

    function onDragLeave(event) {
        event.preventDefault();
        setIsDragging(false);
    }

    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length === 0) return;
        const file = files[0];
        if (file.type.split('/')[0] !== 'image') return;
        const newImage = {
            name: file.name,
            url: URL.createObjectURL(file),
            type: file.type,
        };
        setImage(newImage);
        onImageChange(newImage);
    }

    function uploadFile() {
        if (image) {
            console.log("Plik został wyskłany!");
            console.log("Zdjęcie: ", image);
        } else {
            console.log("Brak zdjęcia do wysłania!");
        }
    }
    
    return (
        <div className="drag_and_drop_card">
            <div className="drop_area" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span className="select">
                        Wrzuć zdjęcia tutaj
                    </span>
                ) : (
                    <>
                        Wrzuć zdjęcia tutaj lub {"   "}
                        <span className="select" role="button" onClick={selectFile}>
                            Szukaj zdjęć
                        </span>
                    </>
                )}

                <input name="file" type="file" className="image_file" ref={fileInputRef} onChange={onFileSelect} />
            </div>

            <div className="container">
                {image && (
                    <div className="image">
                        <span className="delete" onClick={deleteImage}>&times;</span>
                        <img src={image.url} alt={image.name} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DragAndDrop;