import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import DownloadLink from 'react-download-link';
import SVGDownloadIcon from './SVGDownloadIcon';
import './App.css';

function App() {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event) => {
    let newUrl = event.target.value;
    // Si la URL no comienza con "https://" o "http://", añadir "https://"
    if (!newUrl.match(/^(https?|ftp):\/\//)) {
      newUrl = 'https://' + newUrl;
    }
    setUrl(newUrl);
  };

  const getFormattedUrl = () => {
    // Eliminar "http://" o "https://"
    const formattedUrl = url.replace(/^(https?|ftp):\/\//, '');
    return formattedUrl;
  };

  return (
    <div className="container">
    <h1>Generador QR</h1>
    <div id="download" style={{ display: 'flex' }}>
      <input
        type="text"
        id="urlInput"
        value={url}
        onChange={handleUrlChange}
        placeholder="Escribe la URL aquí"
        style={{ flex: '1', marginRight: '10px' }}
      />
      {url && (
        <DownloadLink
          label={
            <>
              <SVGDownloadIcon style={{ marginRight: '5px', fontSize: '16px' }} />
            </>
          }
          filename={`${encodeURIComponent(getFormattedUrl())}.png`}
          exportFile={() => url}
          className="download"
          style={{
            padding: '10px',
            backgroundColor: '#2a2645',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        />
      )}
    </div>
    {url && (
      <div id="qrCode">
        <QRCode value={url} size={200} />
      </div>
    )}
    <footer>
      <div style={{ marginTop: '20px' }}>
        Desarrollado por{' '}
        <a href="https://johnnyportfolio.x10.mx" className="developer" target='_blank' rel='noreferrer'>
          Johnny13
        </a>
      </div>
    </footer>
  </div>
  );
}

export default App;
