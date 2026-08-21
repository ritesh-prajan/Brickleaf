import { forwardRef } from 'react'
import { HERO_ASSETS } from '../constants'

const WallLayer = forwardRef(function WallLayer(props, ref) {
  return (
    <div ref={ref} className="scene-layer scene-layer--wall" {...props}>
      <img
        src={HERO_ASSETS.wallTexture}
        alt="Architectural room with warm plaster wall finish"
        className="scene-image"
        loading="eager"
        decoding="async"
      />
    </div>
  )
})

export default WallLayer
