import ProductHero from "./ProductHero";
import ProductInfo from "./ProductInfo";
import DesignerInfo from "./DesignerInfo";
import ProductDetailSection from "./ProductDetailSection";
import RatingBreakdown from "./RatingBreakdown";
import ReviewCard from "./ReviewCard";
import "./ProductPage.css";
import Button from "./Button";
import { useState } from "react";

interface SizeGuideRow {
  size: string;
  bust: string;
  length: string;
}

interface BreakdownRow {
  label: string;
  percent: number;
}

interface Review {
  avatarUrl?: string;
  reviewerStats: string;
  rating: number;
  likeCount: number;
  reviewText: string;
  imageUrl?: string;
  date: string;
}
export interface ReviewSubmitData {
  rating: number;
  title: string;
  body: string;
  fitFeedback: string;
}

interface ProductPageProps {
  heroImageUrl: string;
  heroCredit: string;
  title: string;
  rating: number;
  reviewCount: number;
  size: string;
  fabric: string;
  fit: string;
  details: string;
  sizeGuide: SizeGuideRow[];
  designerName: string;
  designerImageUrl?: string;
  ratingBreakdown: BreakdownRow[];
  reviews: Review[];
  submitting?: boolean;
  onViewSizeGuide?: () => void;
  onViewCollection?: () => void;
  onViewMoreReviews?: () => void;
  onSubmitReview?: (data: ReviewSubmitData) => void;
}

export default function ProductPage({
  heroImageUrl,
  heroCredit,
  title,
  rating,
  reviewCount,
  size,
  fabric,
  fit,
  details,
  sizeGuide,
  designerName,
  designerImageUrl,
  ratingBreakdown,
  reviews,
  submitting,
  onViewSizeGuide,
  onViewCollection,
  onViewMoreReviews,
  onSubmitReview,
}: ProductPageProps) {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="product-page">
      <ProductHero imageUrl={heroImageUrl} imageAlt={title} credit={heroCredit} />

      <ProductInfo title={title} rating={rating} reviewCount={reviewCount} size={size} onViewSizeGuide={onViewSizeGuide} />

      <DesignerInfo designerName={designerName} designerImageUrl={designerImageUrl} onViewCollection={onViewCollection} />

      <ProductDetailSection fabric={fabric} fit={fit} sizeGuide={sizeGuide} details={details} />
      <Button onClick={() => setOpenForm(true)}>Add a review</Button>
      <div className="product-page__reviews">
        {reviewCount > 0 ? (
          <>
            <RatingBreakdown reviewCount={reviewCount} rows={ratingBreakdown} onViewMore={onViewMoreReviews} />
            {reviews.map((review, i) => (
              <ReviewCard key={i} {...review} />
            ))}
          </>
        ) : (
          <Button onClick={() => setOpenForm(true)}>Be the first to review</Button>
        )}
      </div>

      {openForm && (
        <div className="review-overlay">
          <div className="review-form">
            <div className="review-form__header">
              <div>
                <h2>Write a Review</h2>
                <p>Share your experience with this product.</p>
              </div>

              <button type="button" className="review-form__close" onClick={() => setOpenForm(false)}>
                ×
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = new FormData(e.currentTarget);
                onSubmitReview?.({
                  rating: Number(form.get("rating")),
                  title: String(form.get("title") ?? "").trim(),
                  body: String(form.get("comment") ?? "").trim(),
                  fitFeedback: String(form.get("fit")),
                });
                setOpenForm(false);
              }}
            >
              <div className="form-group">
                <label htmlFor="rating">Rating</label>

                <select id="rating" name="rating" required>
                  <option value="">Select rating</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Very Poor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>

                <input id="title" name="title" type="text" minLength={3} maxLength={100} placeholder="Summarize your experience" required />
              </div>

              <div className="form-group">
                <label htmlFor="fit">How does it fit?</label>

                <select id="fit" name="fit" required>
                  <option value="">Select fit</option>
                  <option value="RUNS_SMALL">Runs small</option>
                  <option value="TRUE_TO_SIZE">True to size</option>
                  <option value="RUNS_LARGE">Runs large</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="comment">Review</label>

                <textarea id="comment" name="comment" placeholder="Share your experience..." rows={5} minLength={10} maxLength={2000} required />
              </div>

              <button type="submit" className="review-form__submit">
                {submitting ? "Menyimpan..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
