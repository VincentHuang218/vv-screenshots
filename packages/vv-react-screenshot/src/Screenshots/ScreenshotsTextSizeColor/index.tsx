import React, { memo, ReactElement } from 'react'
import ScreenshotsTextSize from '../ScreenshotsTextSize'
import ScreenshotsColor from '../ScreenshotsColor'
import './index.less'

export interface SizeColorProps {
  size: number
  color: string
  onSizeChange: (value: number) => void
  onColorChange: (value: string) => void
}

export default memo(function ScreenshotsSizeColor ({
  size,
  color,
  onSizeChange,
  onColorChange
}: SizeColorProps): ReactElement {
  return (
    <div className='screenshots-sizecolor'>
      <ScreenshotsTextSize value={size} onChange={onSizeChange} />
      <span className='screenshots-sizecolor-line' />
      <ScreenshotsColor value={color} onChange={onColorChange} />
    </div>
  )
})
