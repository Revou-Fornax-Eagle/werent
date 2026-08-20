import './DesignerInfo.css'
import designerBanner from '../assets/designer-banner.webp'

interface DesignerInfoProps {
  onViewCollection?: () => void
}

export default function DesignerInfo({
  onViewCollection,
}: DesignerInfoProps) {
  return (
    <div className="designer-info">
      <div className="designer-info__header">
        <span className="designer-info__label">DESIGNERS</span>
        <button type="button" className="designer-info__collection" onClick={onViewCollection}>
          VIEW THE COLLECTION
        </button>
      </div>
      <img className="designer-info__banner" src={designerBanner} alt="n atelier" />
    </div>
  )
}
