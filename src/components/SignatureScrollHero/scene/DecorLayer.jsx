import { forwardRef } from 'react'
import { HERO_ASSETS } from '../constants'

const DecorLayer = forwardRef(function DecorLayer(props, ref) {
  return (
    <div ref={ref} className="scene-layer scene-layer--decor" {...props}>
      <img
        src={HERO_ASSETS.decor}
        alt="Botanicals, stone sculpture, books, and ceramic decor accessories"
        className="scene-image scene-image--object scene-image--decor"
        loading="eager"
        decoding="async"
      />
    </div>
  )
})

export default DecorLayer
