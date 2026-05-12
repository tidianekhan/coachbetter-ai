import React, { useState, useEffect, useRef } from 'react';
import MOCK_REPORT from './mockReport';
import UploadScreen from './components/UploadScreen';
import ProcessingScreen from './components/ProcessingScreen';
import ReportScreen from './components/ReportScreen';
import './styles.css';

// ─── API CONFIG ───────────────────────────────────────────────────────────────
// Toggle MOCK_MODE to false and set API_URL when the real backend is live
const MOCK_MODE = true;
const API_URL = 'https://your-api-url.com';

// ─── Simulated pipeline matching the real API flow ────────────────────────────
async function simulateProcessing(file, onStageChange) {
  const stages = [
    { key: 'uploading',     label: 'Uploading video',         detail: 'Securely transferring your file…',                          duration: 2000 },
    { key: 'transcribing',  label: 'Transcribing audio',      detail: 'Converting speech to text using Whisper…',                   duration: 4000 },
    { key: 'analysing',     label: 'Analysing session',       detail: 'Evaluating against EMCC competency framework…',             duration: 4000 },
    { key: 'generating',    label: 'Generating report',       detail: 'Compiling your personalised evaluation report…',            duration: 2000 },
  ];

  for (let i = 0; i < stages.length; i++) {
    onStageChange(i, stages);
    await new Promise(r => setTimeout(r, stages[i].duration));
  }

  return MOCK_REPORT;
}

// ─── Real API pipeline (used when MOCK_MODE = false) ─────────────────────────
async function realProcessing(file, onStageChange) {
  const stages = [
    { key: 'uploading',    label: 'Uploading video',    detail: 'Securely transferring your file…' },
    { key: 'transcribing', label: 'Transcribing audio', detail: 'Converting speech to text (this may take 15–30 min)…' },
    { key: 'analysing',    label: 'Analysing session',  detail: 'Evaluating against EMCC competency framework…' },
    { key: 'generating',   label: 'Generating report',  detail: 'Compiling your personalised evaluation report…' },
  ];

  // 1. Upload
  onStageChange(0, stages);
  const formData = new FormData();
  formData.append('file', file);
  const uploadRes = await fetch(`${API_URL}/api/v1/upload`, { method: 'POST', body: formData });
  if (!uploadRes.ok) throw new Error('Upload failed');
  const upload = await uploadRes.json();

  // 2. Start transcription
  onStageChange(1, stages);
  const transcribeRes = await fetch(`${API_URL}/api/v1/transcribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ video_key: upload.key, chunk_seconds: 900, model_size: 'base' }),
  });
  if (!transcribeRes.ok) throw new Error('Transcription failed to start');
  const transcription = await transcribeRes.json();

  // 3. Poll until complete
  const maxAttempts = 180;
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise(r => setTimeout(r, 10000));
    const statusRes = await fetch(`${API_URL}/api/v1/transcribe/${transcription.job_id}`);
    const status = await statusRes.json();
    if (status.status === 'Completed') {
      // 4. Evaluate
      onStageChange(2, stages);
      const evalRes = await fetch(`${API_URL}/api/v1/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript_key: status.transcript_key }),
      });
      if (!evalRes.ok) throw new Error('Evaluation failed');
      const evaluation = await evalRes.json();
      onStageChange(3, stages);
      return evaluation.report;
    }
    if (status.status === 'Failed') throw new Error('Transcription failed');
  }
  throw new Error('Processing timed out');
}

export default function App() {
  const [screen, setScreen] = useState('upload'); // 'upload' | 'processing' | 'report'
  const [file, setFile] = useState(null);
  const [stageIndex, setStageIndex] = useState(0);
  const [stages, setStages] = useState([]);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  // Persist job state so user can leave and return
  useEffect(() => {
    const saved = localStorage.getItem('coachAIReport');
    if (saved) {
      try {
        setReport(JSON.parse(saved));
        setScreen('report');
      } catch (_) {
        localStorage.removeItem('coachAIReport');
      }
    }
  }, []);

  async function handleUpload(selectedFile) {
    setFile(selectedFile);
    setError(null);
    setScreen('processing');

    try {
      const processFn = MOCK_MODE ? simulateProcessing : realProcessing;
      const result = await processFn(selectedFile, (idx, stageList) => {
        setStageIndex(idx);
        setStages(stageList);
      });
      localStorage.setItem('coachAIReport', JSON.stringify(result));
      setReport(result);
      setScreen('report');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setScreen('upload');
    }
  }

  function handleReset() {
    localStorage.removeItem('coachAIReport');
    setReport(null);
    setFile(null);
    setError(null);
    setStageIndex(0);
    setStages([]);
    setScreen('upload');
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-mark">cb</span>
            <span className="logo-text">CoachBetter<span className="logo-ai">.ai</span></span>
          </div>
          {screen === 'report' && (
            <button className="btn-outline" onClick={handleReset}>
              Analyse another session
            </button>
          )}
        </div>
      </header>

      <main className="app-main">
        {screen === 'upload' && (
          <UploadScreen onUpload={handleUpload} error={error} />
        )}
        {screen === 'processing' && (
          <ProcessingScreen
            file={file}
            stageIndex={stageIndex}
            stages={stages}
          />
        )}
        {screen === 'report' && report && (
          <ReportScreen report={report} onReset={handleReset} />
        )}
      </main>
    </div>
  );
}
