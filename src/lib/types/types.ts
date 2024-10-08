export interface SwiperProps extends CardEvents {
  id: CardId
  element: HTMLDivElement
}


interface RequiredRibbons {
  aprovalRibbon: React.JSX.Element;
  denialRibbon: React.JSX.Element;
}

interface BaseCardSwiperProps extends CardEvents {
  data: CardData[];
  likeButton?: React.JSX.Element;
  dislikeButton?: React.JSX.Element;
  withActionButtons?: boolean;
  emptyState?: React.JSX.Element;
}

export type CardSwiperProps =
  | (BaseCardSwiperProps & { withRibbons: true } & RequiredRibbons)
  | (BaseCardSwiperProps & { withRibbons?: false });

export interface CardEvents {
  onFinish?: (status: SwipeAction.FINISHED) => void
  onDismiss?: CardEvent
  onEnter?: CardEnterEvent
}

export interface CardData {
  id: CardId
  content: React.JSX.Element
}

export type CardId = string | number
export type CardEnterEvent = (element: HTMLDivElement, meta: CardMetaData, id: CardId) => void
export type CardEvent = (
  element: HTMLDivElement,
  id: CardId,
  action: SwipeAction,
  operation: SwipeOperation,
) => void
export type CardMetaData = Record<string, unknown> | Array<unknown>
export interface CardRibbonColors {
  bgLike?: string
  bgDislike?: string
  textColor?: string
}
export enum SwipeDirection {
  LEFT = -1,
  RIGHT = 1,
}

export enum SwipeAction {
  LIKE = 'like',
  DISLIKE = 'dislike',
  FINISHED = 'finished',
}

export enum SwipeOperation {
  SWIPE = 'swipe',
  CLICK = 'click',
}
