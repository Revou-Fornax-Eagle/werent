import './DesignerInfo.css'

interface DesignerInfoProps {
  designerName: string
  designerImageUrl?: string
  onViewCollection?: () => void
}

export default function DesignerInfo({
  designerName,
  designerImageUrl,
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
      <div className="designer-info__card">
        {designerImageUrl ? (
          <img className="designer-info__image" src={designerImageUrl} alt={designerName} />
        ) : (
          <div className="designer-info__image designer-info__image--placeholder" />
        )}
        <span className="designer-info__name">{designerName}</span>
      </div>
    </div>
  )
}
