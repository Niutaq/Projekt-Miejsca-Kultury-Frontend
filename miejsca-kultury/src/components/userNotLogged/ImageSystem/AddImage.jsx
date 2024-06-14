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

    function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.split('/')[0] === 'image') {
            const newImage = {
                url: URL.createObjectURL(file),
                file: file
            };
            setImage(newImage);
            onImageChange(newImage);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function deleteImage() {
        setImage(null);
        onImageChange(null);
        console.log("Plik został usunięty.");
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', marginTop: '10px' }}>
                <button 
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '18px',
                        backgroundColor: '#d0e0ff',
                        color: '#000000c2',
                        padding: '8px 15px',
                        border: '2px solid rgba(0, 0, 0, 0.222)',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s, color 0.3s',
                        width: '240px'
                    }}
                    onClick={() => document.querySelector('.drag_and_drop_card').scrollIntoView({ behavior: 'smooth' })}
                >
                    Dodaj zdjęcie
                </button>
            </div>
            <div className="drag_and_drop_card" onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className="drag_and_drop_description">
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
                        <div className="image" style={{ position: 'relative' }}>
                            <img src={image.url} alt="Selected" style={{ display: 'block' }} />
                            <span onClick={deleteImage} className="delete" style={{ position: 'absolute', top: '5px', right: '150px', cursor: 'pointer', color: '#8B0000', fontSize: '25px' }}>x</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DragAndDrop;