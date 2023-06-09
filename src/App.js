import React, {useState} from 'react';
import './App.css'

function App() {
  const [allAlbums, setAllAlbums] = useState([]);
  const [focusedAlbum, setFocusedAlbum] = useState(null);

    fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(data => setAllAlbums(data))
        .catch(error => console.log(error));

  const parsePhotos = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
        .then(res =>res.json())
        .then(photos => setFocusedAlbum(photos))
        .catch(error => console.log(error));
  };

  const closePopup = () => {
    setFocusedAlbum(null);
  };

  return (
      <div className="App">
        <h1>Albums</h1>
        <div className="album-grid">
          {allAlbums.map((album) => (
              <div key={album.id} className="album-card" onClick={() => parsePhotos(album.id)}>
                <h2>{album.title}</h2>
              </div>
          ))}
        </div>
        {focusedAlbum && (
            <div className="popup">
              <div className="popup-content">
                <div className="photo-grid">
                  {focusedAlbum.map((photo) => (
                      <div key={photo.id} className="photo-card">
                        <img src={photo.thumbnailUrl} alt={photo.title} />
                        <p>{photo.title}</p>
                      </div>
                  ))}
                </div>
                <button onClick={closePopup}>Close Album</button>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;
