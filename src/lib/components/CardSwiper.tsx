import '../main.css'

import { useEffect, useMemo, useState } from 'react'
import { useCardSwiper } from '../hooks/useCardSwiper'
import { CardSwiperProps, SwipeAction, SwipeDirection } from '../types/types'
import { Swiper } from '../utils/swiper'
import CardSwiperActionButton from './CardSwiperActionButton'
import CardSwiperEmptyState from './CardSwiperEmptyState'
import { CardSwiperLeftActionButton } from './CardSwiperLeftActionButton'
import CardSwiperRibbons from './CardSwiperRibbons'
import { CardSwiperRightActionButton } from './CardSwiperRightActionButton'

export const CardSwiper = (props: CardSwiperProps) => {
  const { data, likeButton, dislikeButton, withActionButtons = false, emptyState, onDismiss, onFinish, onEnter } = props
  const { handleEnter, handleClickEvents, handleNewCardSwiper, dynamicData, isFinish, swiperIndex, swiperElements } =
    useCardSwiper({
      onDismiss,
      onFinish,
      onEnter,
      data,
    })
  const [currentSwiper, setCurrentSwiper] = useState<Swiper | undefined>(swiperElements.current[swiperIndex])
  const [hideActionButtons, setHideActionButtons] = useState('')

  useEffect(() => {
    setCurrentSwiper(swiperElements.current[swiperIndex - 1])
  }, [swiperElements, swiperIndex])

  useEffect(() => {
    currentSwiper && handleEnter(currentSwiper.element, currentSwiper.meta, currentSwiper.id)
  }, [currentSwiper])

  const CardComponents = useMemo(
    () =>
      dynamicData.map(({ id, content }) => (
        <div
          key={id}
          ref={(ref) => handleNewCardSwiper(ref, id,)}
          className="swipe-card__container"
          id="swipe-card__container "
        >

          {props.withRibbons && (
            <CardSwiperRibbons
              aprovalRibbon={props.aprovalRibbon}
              denialRibbon={props.denialRibbon}
            />
          )}

          {content && <div className="swipe-card__content">{content}</div>}
        </div>
      )),
    [],
  )

  useEffect(() => {
    if (isFinish) setHideActionButtons('hide-action-buttons')
  }, [isFinish])

  useEffect(() => {
    const handleWindowBlur = () => {
      currentSwiper?.handleTouchEnd()
      currentSwiper?.handleMoveUp()
    }

    window.addEventListener('blur', handleWindowBlur)

    return () => window.removeEventListener('blur', handleWindowBlur)
  }, [currentSwiper])

  return (
    <div className="">
      <div className="swipe-card" id="swipe-card">
        <div className="swipe-card__cards" id="swipe-card__cards">
          {CardComponents}
          {emptyState && isFinish && <CardSwiperEmptyState children={emptyState} isFinish={isFinish} />}
        </div>
        {withActionButtons && (
          <div className={`swipe-card__children ${hideActionButtons}`} id="swipe-card__children">
            {likeButton && dislikeButton ? (
              <>
                <CardSwiperActionButton
                  isCustom
                  direction={SwipeDirection.LEFT}
                  action={SwipeAction.DISLIKE}
                  onClick={handleClickEvents}
                  buttonContent={dislikeButton}
                />
                <CardSwiperActionButton
                  isCustom
                  direction={SwipeDirection.RIGHT}
                  action={SwipeAction.LIKE}
                  onClick={handleClickEvents}
                  buttonContent={likeButton}
                />
              </>
            ) : (
              <>
                <CardSwiperActionButton
                  direction={SwipeDirection.LEFT}
                  action={SwipeAction.DISLIKE}
                  onClick={handleClickEvents}
                  buttonContent={<CardSwiperLeftActionButton />}
                />
                <CardSwiperActionButton
                  direction={SwipeDirection.RIGHT}
                  action={SwipeAction.LIKE}
                  onClick={handleClickEvents}
                  buttonContent={<CardSwiperRightActionButton />}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
