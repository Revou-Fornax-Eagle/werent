import './ProductHero.css'

interface ProductHeroProps {
  imageUrl: string
  imageAlt: string
  credit: string
}

export default function ProductHero({ imageUrl, imageAlt, credit }: ProductHeroProps) {
  return (
    <div className="product-hero">
      <img className="product-hero__image" src={imageUrl} alt={imageAlt} />
      <span className="product-hero__credit">{credit}</span>
    </div>
  )
}
