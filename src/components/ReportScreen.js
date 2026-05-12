import React, { useState } from 'react';

const TABS = [
  { key: 'overview',     label: 'Overview' },
  { key: 'competencies', label: 'Competencies' },
  { key: 'interventions',label: 'Interventions' },
  { key: 'levers',       label: 'Development Levers' },
  { key: 'risks',        label: 'Risks' },
  { key: 'questions',    label: 'Gold Standard Questions' },
];

function levelBadgeClass(level) {
  if (!level) return '';
  const l = level.toLowerCase();
  if (l.includes('practitioner')) return 'badge badge-practitioner';
  if (l.includes('foundation'))   return 'badge badge-foundation';
  if (l.includes('no violation')) return 'badge badge-good';
  return 'badge';
}

function severityClass(severity) {
  if (!severity) return '';
  const s = severity.toLowerCase().replace(/\s/g, '-');
  return `severity-${s}`;
}

export default function ReportScreen({ report, onReset }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedCompetency, setExpandedCompetency] = useState(null);

  function toggleCompetency(id) {
    setExpandedCompetency(prev => prev === id ? null : id);
  }

  function handlePrint() { window.print(); }

  function handleDownload() {
    const text = JSON.stringify(report, null, 2);
    const blob = new Blob([text], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coaching-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const { executive_summary: es, session, competencies, interventions,
          turning_points, development_levers, risks, gold_standard_questions } = report;

  return (
    <div className="report-screen">
      {/* Header */}
      <div className="report-top">
        <div className="report-title-block">
          <h1>Coaching Evaluation Report</h1>
          <div className="report-meta">
            Generated {session.generated} · Session length {session.session_length} · {session.assessor}
          </div>
        </div>
        <div className="report-actions">
          <button className="btn-ghost" onClick={handlePrint}>🖨 Print</button>
          <button className="btn-ghost" onClick={handleDownload}>⬇ Download JSON</button>
        </div>
      </div>

      {/* High-leverage callout */}
      <div className="highlight-box">
        <div className="highlight-box-icon">💡</div>
        <div className="highlight-box-content">
          <h3>If you change one thing next session</h3>
          <p>{es.high_leverage_change}</p>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="report-tabs">
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`report-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ──────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div>
          {/* Summary metrics */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-card-label">Overall Level</div>
              <div className="summary-card-value">
                <span className={levelBadgeClass(es.overall_level)}>{es.overall_level}</span>
              </div>
            </div>
            <div className="summary-card">
              <div className="summary-card-label">Confidence</div>
              <div className="summary-card-value" style={{ fontSize: 15 }}>{es.confidence}</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-label">Session Length</div>
              <div className="summary-card-value" style={{ fontSize: 15 }}>{session.session_length}</div>
            </div>
            <div className="summary-card">
              <div className="summary-card-label">Competencies Assessed</div>
              <div className="summary-card-value">{competencies.length}</div>
            </div>
          </div>

          {/* Key outcome */}
          <div className="report-section">
            <h2 className="section-heading">Key Session Outcome</h2>
            <div style={{
              background: 'white',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem 1.5rem',
              fontSize: 15,
              color: 'var(--ink-soft)',
              lineHeight: 1.7,
            }}>
              {es.key_outcome}
            </div>
          </div>

          {/* Major insights */}
          <div className="report-section">
            <h2 className="section-heading">Major Insights</h2>
            <div className="insight-list">
              {es.major_insights.map((insight, i) => (
                <div className="insight-item" key={i}>
                  <div className="insight-dot" />
                  <div className="insight-text">{insight}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top priorities */}
          <div className="report-section">
            <h2 className="section-heading">Top 3 Priorities</h2>
            <div className="priorities-list">
              {es.top_priorities.map((p, i) => (
                <div className="priority-item" key={i}>
                  <div className="priority-num">{i + 1}</div>
                  <div className="priority-text">{p}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Turning points */}
          <div className="report-section">
            <h2 className="section-heading">Key Turning Points</h2>
            <div className="turning-points">
              {turning_points.map((tp, i) => (
                <div className="turning-point" key={i}>
                  <div className="turning-point-num">{i + 1}</div>
                  <div>
                    <div className="turning-point-title">{tp.title}</div>
                    <div className="turning-point-desc">{tp.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key risk callout */}
          <div className="report-section">
            <h2 className="section-heading">Key Risk to Watch</h2>
            <div style={{
              background: 'var(--red-light)',
              border: '1px solid #F7C1C1',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
              fontSize: 14,
              color: 'var(--red)',
              lineHeight: 1.65,
            }}>
              ⚠ {es.key_risk}
            </div>
          </div>
        </div>
      )}

      {/* ── COMPETENCIES TAB ─────────────────────────────────────────────── */}
      {activeTab === 'competencies' && (
        <div>
          <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: '1.5rem' }}>
            Click any competency to expand the full evaluation and development suggestions.
          </p>
          <div className="competency-grid">
            {competencies.map(comp => (
              <div
                key={comp.id}
                className={`competency-card ${expandedCompetency === comp.id ? 'expanded' : ''}`}
                onClick={() => toggleCompetency(comp.id)}
              >
                <div className="competency-card-header">
                  <div>
                    <div className="competency-number">Competency {comp.id}</div>
                    <div className="competency-name">{comp.name}</div>
                  </div>
                  <span className={`competency-chevron ${expandedCompetency === comp.id ? 'open' : ''}`}>
                    ▾
                  </span>
                </div>
                <div className="competency-meta">
                  <span className={levelBadgeClass(comp.level)}>{comp.levelShort}</span>
                  <span className="competency-confidence">Confidence: {comp.confidence}</span>
                </div>

                {expandedCompetency === comp.id && (
                  <>
                    <div className="competency-summary">{comp.summary}</div>
                    {comp.development_suggestions.length > 0 && (
                      <div className="dev-suggestions">
                        <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-muted)', marginBottom: 8, marginTop: 12 }}>
                          Development suggestions
                        </div>
                        {comp.development_suggestions.map((s, i) => (
                          <div className="dev-suggestion" key={i}>
                            <div className="dev-suggestion-title">{s.title}</div>
                            <div className="dev-suggestion-desc">{s.description}</div>
                            <div className="dev-suggestion-impact">→ {s.expected_impact}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── INTERVENTIONS TAB ────────────────────────────────────────────── */}
      {activeTab === 'interventions' && (
        <div>
          <div className="interventions-grid">
            {interventions.map((iv, i) => (
              <div className="intervention-card" key={i}>
                <div className="intervention-name">{iv.name}</div>
                <span className={`badge intervention-assessment ${
                  iv.assessment.toLowerCase().includes('highly') ? 'badge-practitioner' :
                  iv.assessment.toLowerCase() === 'effective' ? 'badge-good' : 'badge-foundation'
                }`}>
                  {iv.assessment}
                </span>
                <div className="intervention-row" style={{ marginTop: 10 }}>
                  <div className="intervention-row-label">Client response</div>
                  <div className="intervention-row-text">{iv.client_response}</div>
                </div>
                <div className="intervention-row">
                  <div className="intervention-row-label">Observed shift</div>
                  <div className="intervention-row-text">{iv.observed_shift}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DEVELOPMENT LEVERS TAB ───────────────────────────────────────── */}
      {activeTab === 'levers' && (
        <div>
          <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: '1.5rem' }}>
            The three highest-impact changes you can make — ranked by expected effect on your practice.
          </p>
          <div className="dev-levers">
            {development_levers.map((lever, i) => (
              <div className="dev-lever" key={i}>
                <div className="dev-lever-rank">#{lever.rank}</div>
                <div className="dev-lever-content">
                  <h4>{lever.title}</h4>
                  <div className="dev-lever-pattern">{lever.pattern}</div>
                  <div className="dev-lever-row">
                    <div className="dev-lever-row-label">Why it matters</div>
                    <div className="dev-lever-row-text">{lever.why_it_matters}</div>
                  </div>
                  <div className="dev-lever-row">
                    <div className="dev-lever-row-label">What to do next session</div>
                    <div className="dev-lever-row-text">{lever.what_to_do}</div>
                  </div>
                  <div className="dev-lever-impact">
                    Expected impact: {lever.expected_client_impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RISKS TAB ────────────────────────────────────────────────────── */}
      {activeTab === 'risks' && (
        <div>
          <div className="risks-list">
            {risks.map((risk, i) => {
              const sc = severityClass(risk.severity);
              return (
                <div className={`risk-card ${sc}`} key={i}>
                  <div className="risk-header">
                    <div className="risk-title">{risk.title}</div>
                    <span className="risk-severity">{risk.severity}</span>
                  </div>
                  <div className="risk-row">
                    <div className="risk-row-label">Evidence</div>
                    <div className="risk-row-text">{risk.evidence}</div>
                  </div>
                  <div className="risk-row">
                    <div className="risk-row-label">Why it matters</div>
                    <div className="risk-row-text">{risk.why_it_matters}</div>
                  </div>
                  <div className="risk-monitor">
                    → Monitor: {risk.monitor}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── GOLD STANDARD QUESTIONS TAB ──────────────────────────────────── */}
      {activeTab === 'questions' && (
        <div>
          <p style={{ color: 'var(--ink-muted)', fontSize: 14, marginBottom: '1.5rem' }}>
            Questions tailored to the specific client patterns observed in this session.
          </p>
          <div className="gsq-grid">
            {gold_standard_questions.map((group, i) => (
              <div className="gsq-card" key={i}>
                <div className="gsq-pattern">{group.pattern}</div>
                <div className="gsq-questions">
                  {group.questions.map((q, j) => (
                    <div className="gsq-question" key={j}>"{q}"</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
