import './StarRating.css'

interface StarRatingProps {
  rating: number
  size?: number
}

export default function StarRating({ rating, size = 8 }: StarRatingProps) {
  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`star-rating__star${i < rating ? ' star-rating__star--filled' : ''}`}
          style={{ width: size, height: size }}
        />
      ))}
    </div>
  )
}
