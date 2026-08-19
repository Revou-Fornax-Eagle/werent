import StarRating from "./StarRating";
import "./ProductInfo.css";

interface ProductInfoProps {
  title: string;
  rating: number;
  reviewCount: number;
  size: string;
  onViewSizeGuide?: () => void;
}

export default function ProductInfo({ title, rating, reviewCount, size, onViewSizeGuide }: ProductInfoProps) {
  return (
    <div className="product-info">
      <h2 className="product-info__title">{title}</h2>
      <div className="product-info__rating-row">
        <StarRating rating={rating} size={14} />
        <span className="product-info__review-count">{reviewCount} REVIEWS </span>
      </div>
      <div className="product-info__size-row">
        <span className="product-info__size-badge">{size}</span>
        <button type="button" className="product-info__size-guide" onClick={onViewSizeGuide}>
          VIEW SIZE GUIDE
        </button>
      </div>
    </div>
  );
}
