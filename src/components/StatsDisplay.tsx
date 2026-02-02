import '../styles/stats.css';

interface StatsDisplayProps {
  originalSize: number;
  convertedSize: number;
}

function StatsDisplay({ originalSize, convertedSize }: StatsDisplayProps) {
  const reduction = originalSize > 0 
    ? ((originalSize - convertedSize) / originalSize * 100).toFixed(1)
    : 0;

  return (
    <div className="stats-container">
      <div className="stat-item">
        <span className="stat-label">Original:</span>
        <span className="stat-value">{originalSize}</span>
        <span className="stat-unit">chars</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Converted:</span>
        <span className="stat-value">{convertedSize}</span>
        <span className="stat-unit">chars</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Reduction:</span>
        <span className="stat-value reduction-value">{reduction}%</span>
      </div>
    </div>
  );
}

export default StatsDisplay;
