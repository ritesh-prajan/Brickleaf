import { forwardRef } from 'react'
import { HERO_ASSETS } from '../constants'

const EmptyRoom = forwardRef(function EmptyRoom(props, ref) {
  return (
    <div ref={ref} className="scene-layer scene-layer--empty" {...props}>
      <img
        src={HERO_ASSETS.emptyRoomDim}
        alt="Dim base architectural room shell"
        className="scene-image"
        loading="eager"
        decoding="async"
      />
      {/* Dark overlay for initial cold dim state */}
      <div className="scene-dark-overlay" />
    </div>
  )
})

export default EmptyRoom
