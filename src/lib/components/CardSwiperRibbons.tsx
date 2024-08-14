import React from "react"
interface CardSwiperRibbonsProps {
  aprovalRibbon?: React.JSX.Element
  denialRibbon?: React.JSX.Element
}

function CardSwiperRibbons({ denialRibbon, aprovalRibbon }: CardSwiperRibbonsProps) {
  return (
    <div className="swipe-card__ribbons-container" id="swipe-card__ribbons-container">
      <div className="swipe-card__ribbon-like">
        {aprovalRibbon}
      </div>
      <div className="swipe-card__ribbon-dislike">
        {denialRibbon}
      </div>
    </div>
  )
}

export default CardSwiperRibbons
