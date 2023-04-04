import React, { memo, ReactElement } from 'react'
import './index.less'

export interface SizeProps {
  value: number
  onChange: (value: number) => void
}

export default memo(function ScreenshotsTextSize ({ value, onChange }: SizeProps): ReactElement {
  const sizes = [12, 14, 16, 18, 20, 22]
  return (
    <div className='screenshots-text-size'>
      <select id='colors' onChange={(e) => onChange(+e.target.value)}>
        {sizes.map(size => {
          return (
            <option key={size} value={size} selected={size === value}>{size}</option>
          )
        })}
      </select>
    </div>
  )
})
