import "./RatingBreakdown.css";

interface BreakdownRow {
  label: string;
  percent: number;
}

interface RatingBreakdownProps {
  reviewCount: number;
  rows: BreakdownRow[];
  onViewMore?: () => void;
}

export default function RatingBreakdown({ reviewCount, rows, onViewMore }: RatingBreakdownProps) {
  return (
    <div className="rating-breakdown">
      <div className="rating-breakdown__header">
        <span className="rating-breakdown__title">REVIEWS ({reviewCount})</span>
        <button type="button" className="rating-breakdown__view-more" onClick={onViewMore}>
          View More&gt;
        </button>
      </div>
      <div className="rating-breakdown__rows">
        {rows.map((row) => (
          <div key={row.label} className="rating-breakdown__row">
            <span className="rating-breakdown__label">{row.label}</span>
            <div className="rating-breakdown__track">
              <div className="rating-breakdown__fill" style={{ width: `${row.percent}%` }} />
            </div>
            <span className="rating-breakdown__percent">{row.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
