import "./ProductDetailSection.css";

interface SizeGuideRow {
  size: string;
  bust: string;
  length: string;
}

interface ProductDetailSectionProps {
  fabric: string;
  fit: string;
  sizeGuide: SizeGuideRow[];
  details: string;
}

export default function ProductDetailSection({ fabric, fit, sizeGuide, details }: ProductDetailSectionProps) {
  return (
    <div className="product-detail">
      <h3 className="product-detail__title">PRODUCT DETAIL</h3>
      <div className="product-detail__label">{details}</div>
      <div className="product-detail__row">
        <span className="product-detail__label">FABRIC</span>
        <span className="product-detail__value">{fabric}</span>
      </div>

      <div className="product-detail__row">
        <span className="product-detail__label">FIT</span>
        <span className="product-detail__value">{fit}</span>
      </div>

      <div className="product-detail__size-guide">
        <span className="product-detail__label">SIZE GUIDE</span>
        <table className="product-detail__table">
          <thead>
            <tr>
              <th>SIZE</th>
              <th>BUST</th>
              <th>LENGTH</th>
            </tr>
          </thead>
          <tbody>
            {sizeGuide.map((row) => (
              <tr key={row.size}>
                <td>{row.size}</td>
                <td>{row.bust}</td>
                <td>{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
