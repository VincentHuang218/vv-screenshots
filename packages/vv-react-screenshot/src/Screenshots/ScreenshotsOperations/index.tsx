import React, { memo, MouseEvent, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import useBounds from '../hooks/useBounds'
import useStatus from '../hooks/useStatus'
import useStore from '../hooks/useStore'
import OperationButtons from '../operations'
import { Bounds, Position } from '../types'
import './index.less'

export const ScreenshotsOperationsCtx = React.createContext<Bounds | null>(null)

export default memo(function ScreenshotsOperations (): ReactElement | null {
  const { width, height, operation } = useStore()
  const [bounds] = useBounds()
  const [status] = useStatus()
  const [operationsRect, setOperationsRect] = useState<Bounds | null>(null)
  const [position, setPosition] = useState<Position | null>(null)

  const elRef = useRef<HTMLDivElement>(null)
  const onDoubleClick = useCallback((e: MouseEvent) => {
    e.stopPropagation()
  }, [])

  const onContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!bounds || !elRef.current) {
      return
    }

    const elRect = elRef.current.getBoundingClientRect()

    let x = bounds.x + bounds.width - elRect.width
    let y = bounds.y + bounds.height + 10

    if (x < 0) {
      x = 0
    }

    if (x > width - elRect.width) {
      x = width - elRect.width
    }

    if (y > height - elRect.height || (operation && y > height - elRect.height - 55)) {
      y = bounds.y - elRect.height - 10
    }

    if (y < 0) {
      y = 0
    }

    // 小数存在精度问题
    if (!position || Math.abs(position.x - x) > 1 || Math.abs(position.y - y) > 1) {
      setPosition({
        x,
        y
      })
    }

    // 小数存在精度问题
    if (
      !operationsRect ||
      Math.abs(operationsRect.x - elRect.x) > 1 ||
      Math.abs(operationsRect.y - elRect.y) > 1 ||
      Math.abs(operationsRect.width - elRect.width) > 1 ||
      Math.abs(operationsRect.height - elRect.height) > 1
    ) {
      setOperationsRect({
        x: elRect.x,
        y: elRect.y,
        width: elRect.width,
        height: elRect.height
      })
    }
  }, [bounds, height, operationsRect, position, width, operation])

  if (!bounds) {
    return null
  }

  return (
    <ScreenshotsOperationsCtx.Provider value={operationsRect}>
      <div
        ref={elRef}
        className='screenshots-operations'
        style={{
          visibility: position && status === 1 ? 'visible' : 'hidden',
          transform: `translate(${position?.x ?? 0}px, ${position?.y ?? 0}px)`
        }}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
      >
        <div className='screenshots-operations-buttons'>
          {OperationButtons.map((OperationButton, index) => {
            if (OperationButton === '|') {
              return <div key={index} className='screenshots-operations-divider' />
            } else {
              return <OperationButton key={index} />
            }
          })}
        </div>
      </div>
    </ScreenshotsOperationsCtx.Provider>
  )
})
