import React, { memo, ReactElement, ReactNode, useCallback } from 'react'
import ScreenshotsOption from '../ScreenshotsOption'
import { Tooltip } from 'react-tooltip'
import './index.less'

export interface ScreenshotsButtonProps {
  title: string
  id: string
  icon: string
  checked?: boolean
  disabled?: boolean
  option?: ReactNode
  onClick?: (e: PointerEvent) => unknown
}

export default memo(function ScreenshotsButton ({
  title,
  id,
  icon,
  checked,
  disabled,
  option,
  onClick
}: ScreenshotsButtonProps): ReactElement {
  const classNames = ['screenshots-button']

  const onButtonClick = useCallback(
    e => {
      if (disabled || !onClick) {
        return
      }
      onClick(e)
    },
    [disabled, onClick]
  )

  if (checked) {
    classNames.push('screenshots-button-checked')
  }
  if (disabled) {
    classNames.push('screenshots-button-disabled')
  }

  return (
    <ScreenshotsOption open={checked} content={option}>
      <div className={classNames.join(' ')} onClick={onButtonClick} data-tooltip-id={id} data-tooltip-content={title}>
        <span className={icon} />
        <Tooltip id={id} className='vv-react-tooltip' />
      </div>
    </ScreenshotsOption>
  )
})
