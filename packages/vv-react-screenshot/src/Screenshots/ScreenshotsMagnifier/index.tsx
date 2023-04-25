import React, { memo, useEffect, useLayoutEffect, useRef, useState, useMemo } from 'react'
import useLang from '../hooks/useLang'
import useStore from '../hooks/useStore'
import { Position, Display } from '../types'
import './index.less'

export interface ScreenshotsMagnifierProps {
  x: number
  y: number
  display: Display
}

const magnifierWidth = 100
const magnifierHeight = 80

// 计算不同屏幕的鼠标坐标
function calcCoord (x: number, y: number, display: Display) {
  const { x: px = 0, y: py = 0 } = display as { x: number; y: number } || {}
  let tx = x
  let ty = y
  if (x < 0) {
    tx = Math.abs(px) + x
    ty = Math.abs(py) + y
  }

  return { x: tx, y: ty }
}

export default memo(function ScreenshotsMagnifier ({ x, y, display }: ScreenshotsMagnifierProps) {
  const { width, height, image } = useStore()
  const lang = useLang()
  const [position, setPosition] = useState<Position | null>(null)
  const elRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const [rgb, setRgb] = useState('000000')

  const coords = useMemo(() => {
    return calcCoord(x, y, display)
  }, [x, y, display])

  useLayoutEffect(() => {
    if (!elRef.current) {
      return
    }
    const elRect = elRef.current.getBoundingClientRect()
    const x = coords.x
    const y = coords.y
    let tx = x + 16
    let ty = y + 20

    if (tx + elRect.width > width) {
      tx = x - elRect.width - 16
    }
    if (ty + elRect.height > height) {
      ty = y - elRect.height - 20
    }

    if (tx < 0) {
      tx = 0
    }
    if (ty < 0) {
      ty = 0
    }
    setPosition({
      x: tx,
      y: ty
    })
  }, [width, height, coords])

  useEffect(() => {
    if (!image || !canvasRef.current) {
      ctxRef.current = null
      return
    }

    if (!ctxRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d')
    }
    if (!ctxRef.current) {
      return
    }

    const x = coords.x
    const y = coords.y
    const ctx = ctxRef.current
    ctx.clearRect(0, 0, magnifierWidth, magnifierHeight)
    const rx = image.naturalWidth / width
    const ry = image.naturalHeight / height

    // 显示原图比例
    ctx.drawImage(
      image,
      x * rx - magnifierWidth / 2,
      y * ry - magnifierHeight / 2,
      magnifierWidth,
      magnifierHeight,
      0,
      0,
      magnifierWidth,
      magnifierHeight
    )
    const { data } = ctx.getImageData(Math.floor(magnifierWidth / 2), Math.floor(magnifierHeight / 2), 1, 1)
    const hex = Array.from(data.slice(0, 3))
      .map(val => (val >= 16 ? val.toString(16) : `0${val.toString(16)}`))
      .join('')
      .toUpperCase()

    setRgb(hex)
  }, [width, height, image, coords])

  return (
    <div
      ref={elRef}
      className='screenshots-magnifier'
      style={{
        transform: `translate(${position?.x}px, ${position?.y}px)`
      }}
    >
      <div className='screenshots-magnifier-body'>
        <canvas
          ref={canvasRef}
          className='screenshots-magnifier-body-canvas'
          width={magnifierWidth}
          height={magnifierHeight}
        />
      </div>
      <div className='screenshots-magnifier-footer'>
        <div className='screenshots-magnifier-footer-item'>
          {lang.magnifier_position_label}: ({coords.x},{coords.y})
        </div>
        <div className='screenshots-magnifier-footer-item'>RGB: #{rgb}</div>
      </div>
    </div>
  )
})
