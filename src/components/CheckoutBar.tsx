import './CheckoutBar.css'

interface CheckoutBarProps {
  price: string
  duration: string
  onAdd: () => void
}

export default function CheckoutBar({ price, duration, onAdd }: CheckoutBarProps) {
  return (
    <div className="checkout-bar">
      <div className="checkout-bar__info">
        <span className="checkout-bar__label">Rent Fee</span>
        <span className="checkout-bar__price">
          {price}/{duration}
        </span>
      </div>
      <button type="button" className="checkout-bar__add" onClick={onAdd}>
        TAMBAHKAN
      </button>
    </div>
  )
}
