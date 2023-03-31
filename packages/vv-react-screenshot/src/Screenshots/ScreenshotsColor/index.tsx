import React, { memo, ReactElement } from 'react'
import './index.less'

export interface ColorProps {
  value: string
  onChange: (value: string) => void
}

export default memo(function ScreenshotsColor ({ value, onChange }: ColorProps): ReactElement {
  const colors = ['#F55656', '#FFA22D', '#44C69D', '#5590F6', '#B620E0']
  return (
    <div className='screenshots-color'>
      {colors.map(color => {
        const classNames = ['screenshots-color-item']
        if (color === value) {
          classNames.push('screenshots-color-active')
        }
        return (
          <div
            key={color}
            className={classNames.join(' ')}
            style={{ backgroundColor: color }}
            onClick={() => onChange && onChange(color)}
          />
        )
      })}
    </div>
  )
})
