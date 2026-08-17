import ProductHero from './ProductHero'
import ProductInfo from './ProductInfo'
import DesignerInfo from './DesignerInfo'
import ProductDetailSection from './ProductDetailSection'
import RatingBreakdown from './RatingBreakdown'
import ReviewCard from './ReviewCard'
import './ProductPage.css'

interface SizeGuideRow {
  size: string
  bust: string
  length: string
}

interface BreakdownRow {
  label: string
  percent: number
}

interface Review {
  avatarUrl?: string
  reviewerStats: string
  rating: number
  likeCount: number
  reviewText: string
  imageUrl?: string
  date: string
}

interface ProductPageProps {
  heroImageUrl: string
  heroCredit: string
  title: string
  rating: number
  reviewCount: number
  size: string
  fabric: string
  fit: string
  sizeGuide: SizeGuideRow[]
  designerName: string
  designerImageUrl?: string
  ratingBreakdown: BreakdownRow[]
  reviews: Review[]
  onViewSizeGuide?: () => void
  onViewCollection?: () => void
  onViewMoreReviews?: () => void
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
  sizeGuide,
  designerName,
  designerImageUrl,
  ratingBreakdown,
  reviews,
  onViewSizeGuide,
  onViewCollection,
  onViewMoreReviews,
}: ProductPageProps) {
  return (
    <div className="product-page">
      <ProductHero imageUrl={heroImageUrl} imageAlt={title} credit={heroCredit} />

      <ProductInfo
        title={title}
        rating={rating}
        reviewCount={reviewCount}
        size={size}
        onViewSizeGuide={onViewSizeGuide}
      />

      <DesignerInfo
        designerName={designerName}
        designerImageUrl={designerImageUrl}
        onViewCollection={onViewCollection}
      />

      <ProductDetailSection fabric={fabric} fit={fit} sizeGuide={sizeGuide} />

      <div className="product-page__reviews">
        <RatingBreakdown reviewCount={reviewCount} rows={ratingBreakdown} onViewMore={onViewMoreReviews} />
        {reviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>
    </div>
  )
}
