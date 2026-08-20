import StarRating from "./StarRating";
import "./ReviewCard.css";

interface ReviewCardProps {
  avatarUrl?: string;
  reviewerStats: string;
  fitFeedback?: string;
  rating: number;
  likeCount: number;
  reviewText: string;
  imageUrl?: string;
  date: string;
  onLike?: () => void;
  onReadMore?: () => void;
}

export default function ReviewCard({ avatarUrl, reviewerStats, fitFeedback, rating, likeCount, reviewText, imageUrl, date, onLike, onReadMore }: ReviewCardProps) {
  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__meta">
          {avatarUrl ? <img className="review-card__avatar" src={avatarUrl} alt="" /> : <div className="review-card__avatar review-card__avatar--placeholder" />}
          <div className="review-card__meta-text">
            <StarRating rating={rating} />
            <span className="review-card__stats">{fitFeedback}</span>
          </div>
        </div>
        <button type="button" className="review-card__like" onClick={onLike}>
          <span className="review-card__thumb" aria-hidden="true" />
          <span>({likeCount})</span>
        </button>
      </div>

      <p className="review-card__text">
        <span style={{ fontWeight: "bold" }}>{reviewerStats}</span> <br />
        {reviewText}
      </p>
      <button type="button" className="review-card__read-more" onClick={onReadMore}>
        Read more &gt;
      </button>
      {imageUrl && (
        <div className="review-card__image">
          <img src={imageUrl} alt="Review attachment" />
        </div>
      )}
      <span className="review-card__date">{date}</span>
    </div>
  );
}
