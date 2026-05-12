import React from 'react';

function formatBytes(bytes) {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function ProcessingScreen({ file, stageIndex, stages }) {
  const totalStages = stages.length || 4;
  const progress = stages.length > 0
    ? Math.round(((stageIndex + 0.5) / totalStages) * 100)
    : 10;

  return (
    <div className="processing-screen">
      <div className="processing-header">
        <h2>Analysing your session</h2>
        <p>
          {file ? `${file.name}${file.size ? ' · ' + formatBytes(file.size) : ''}` : 'Processing…'}
        </p>
      </div>

      <div className="processing-card">
        <div className="stage-list">
          {(stages.length > 0 ? stages : defaultStages()).map((stage, i) => {
            const status =
              i < stageIndex ? 'done' :
              i === stageIndex ? 'active' :
              'pending';

            return (
              <div className="stage-item" key={stage.key}>
                <div className={`stage-indicator ${status}`}>
                  {status === 'done'   && '✓'}
                  {status === 'active' && <span className="stage-spinner" />}
                  {status === 'pending' && (i + 1)}
                </div>
                <div className="stage-content">
                  <div className={`stage-label ${status === 'pending' ? 'pending' : ''}`}>
                    {stage.label}
                  </div>
                  {status === 'active' && (
                    <div className="stage-detail">{stage.detail}</div>
                  )}
                  {status === 'done' && (
                    <div className="stage-detail" style={{ color: 'var(--teal)' }}>Complete</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <p className="processing-tip">
        <strong>You can close this tab.</strong> Your report will be available when you return — we save your progress automatically.
      </p>
    </div>
  );
}

function defaultStages() {
  return [
    { key: 'uploading',    label: 'Uploading video',    detail: 'Securely transferring your file…' },
    { key: 'transcribing', label: 'Transcribing audio', detail: 'Converting speech to text…' },
    { key: 'analysing',    label: 'Analysing session',  detail: 'Evaluating EMCC competencies…' },
    { key: 'generating',   label: 'Generating report',  detail: 'Compiling your report…' },
  ];
}
