import './Row.css';

export function Row({ label, value, readOnly = false }) {
  return (
    <div className="project-detail-row">
      <span className="detail-label">{label}:</span>
      <span className={`detail-value ${readOnly ? 'read-only' : ''}`}>{value}</span>
    </div>
  );
}