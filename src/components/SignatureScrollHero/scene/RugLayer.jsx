import { forwardRef } from 'react'
import { HERO_ASSETS } from '../constants'

const RugLayer = forwardRef(function RugLayer(props, ref) {
  return (
    <div ref={ref} className="scene-layer scene-layer--rug" {...props}>
      <img
        src={HERO_ASSETS.rug}
        alt="Tactile woven area rug"
        className="scene-image scene-image--object scene-image--rug"
        loading="eager"
        decoding="async"
      />
    </div>
  )
})

export default RugLayer
