import React, { useState } from 'react';

export const ImageCaptureLibrary = ({ onComplete }) => {
  const [images, setImages] = useState({
    front: null,
    back: null,
    left: null,
    right: null,
  });

  const [currentView, setCurrentView] = useState('front');

  const views = ['front', 'back', 'left', 'right'];

  const handleImageCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [currentView]: URL.createObjectURL(file) }));
      const nextViewIndex = views.indexOf(currentView) + 1;
      if (nextViewIndex < views.length) {
        setCurrentView(views[nextViewIndex]);
      }
    }
  };

  const handleDone = () => {
    if (Object.values(images).every((img) => img !== null)) {
      onComplete(images);
    } else {
      alert('Please capture all views before completing.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>Capture {currentView} image</h3>
      <input type="file" accept="image/*" capture="camera" onChange={handleImageCapture} />
      <div style={{ marginTop: '20px' }}>
        {views.map((view) => (
          <div key={view} style={{ marginBottom: '10px' }}>
            {images[view] && (
              <img
                src={images[view]}
                alt={`${view} view`}
                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
              />
            )}
          </div>
        ))}
      </div>
      {currentView === 'right' && (
        <button onClick={handleDone} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Done
        </button>
      )}
    </div>
  );
};

export default ImageCaptureLibrary;
