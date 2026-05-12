import React, { useState, useRef } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
const ACCEPTED_FORMATS = ['.mp4', '.mov', '.mkv', '.wav', '.mp3', '.m4a', '.webm'];

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function UploadScreen({ onUpload, error }) {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const inputRef = useRef();

  function validateFile(f) {
    if (!f) return null;
    const ext = '.' + f.name.split('.').pop().toLowerCase();
    if (!ACCEPTED_FORMATS.includes(ext)) {
      return `Unsupported format. Please upload ${ACCEPTED_FORMATS.join(', ')}`;
    }
    if (f.size > MAX_FILE_SIZE) {
      return `File too large. Maximum size is 5 GB.`;
    }
    return null;
  }

  function handleFile(f) {
    const err = validateFile(f);
    if (err) {
      setValidationError(err);
      setFile(null);
    } else {
      setValidationError(null);
      setFile(f);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function handleChange(e) {
    const f = e.target.files[0];
    if (f) handleFile(f);
  }

  function handleSubmit() {
    if (file) onUpload(file);
  }

  const displayError = validationError || error;

  return (
    <div className="upload-screen">
      <div className="upload-headline">
        <h1>Elevate your coaching with <em>AI-powered</em> feedback</h1>
        <p>Upload a recording of your coaching session and receive a detailed evaluation report based on EMCC competency standards.</p>
      </div>

      {!file ? (
        <div
          className={`dropzone ${dragging ? 'dragging' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="video/*,audio/*,.mov,.mp4,.mkv,.wav,.mp3,.m4a,.webm"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <div className="dropzone-icon">📹</div>
          <h3>Drop your session video here</h3>
          <p>or click to browse files</p>
          <p className="formats">{ACCEPTED_FORMATS.join(' · ')} · Max 5 GB</p>
        </div>
      ) : (
        <div className="file-selected">
          <span className="file-selected-icon">🎬</span>
          <div className="file-selected-info">
            <div className="file-selected-name">{file.name}</div>
            <div className="file-selected-size">{formatBytes(file.size)}</div>
          </div>
          <button
            className="file-clear"
            onClick={() => { setFile(null); setValidationError(null); }}
            title="Remove file"
          >×</button>
        </div>
      )}

      {displayError && (
        <div className="error-banner">⚠ {displayError}</div>
      )}

      <button
        className="btn-primary"
        onClick={handleSubmit}
        disabled={!file}
        style={{ minWidth: 200 }}
      >
        Analyse session →
      </button>

      <p className="upload-note">
        Analysis typically takes <strong>15–30 minutes</strong> depending on session length. You'll be notified when your report is ready.
      </p>
    </div>
  );
}
